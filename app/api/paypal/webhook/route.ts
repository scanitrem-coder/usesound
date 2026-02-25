export const runtime = "nodejs";

import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { verifyPaypalSignature } from "@/lib/paypal";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: Request) {
  console.log("Webhook hit");
  const supabase = getSupabaseAdmin();

  // We must read raw body for PayPal signature verification
  const rawBody = await req.text();
  const headerList = await headers();

  try {
    // 0️⃣ Guard: if PayPal headers missing → ignore
    if (!headerList.get("paypal-transmission-id")) {
      return new NextResponse("Missing PayPal headers", { status: 400 });
    }

    // 1️⃣ Verify signature
    const isValid = await verifyPaypalSignature(rawBody, headerList);
    if (!isValid) return new NextResponse("Invalid signature", { status: 400 });

    const event = JSON.parse(rawBody);
    console.log("Event type:", event.event_type);

    // 2️⃣ Idempotency check
    const eventId = event.id;

    const existingEvent = await supabase
      .from("payment_events")
      .select("id")
      .eq("id", eventId)
      .maybeSingle();

    if (existingEvent.data) {
      // Event already processed
      return NextResponse.json({ ok: true, duplicated: true });
    }

    // Save raw event (audit log)
    await supabase.from("payment_events").insert({
      id: eventId,
      event_type: event.event_type,
      raw: event,
    });

    // ======================================================================================
    // 🎯 PAYPAL EVENTS PROCESSING
    // ======================================================================================

    // Helper to update payment record
    const updatePayment = async (orderId: string, data: any) => {
      return supabase.from("payments").update(data).eq("provider_order_id", orderId);
    };

    // Extract IDs
    const capture = event.resource;
    const related = capture?.supplementary_data?.related_ids;
    const orderId = related?.order_id;

    // If no order id → nothing to process
    if (!orderId) {
      return NextResponse.json({ ok: true, ignored: true });
    }

    // ======================================================================================
    // 🟡 CHECKOUT.ORDER.APPROVED → means user confirmed PayPal but payment still pending
    // ======================================================================================
    if (event.event_type === "CHECKOUT.ORDER.APPROVED") {
      await updatePayment(orderId, {
        status: "awaiting_webhook",
        raw_webhook: event,
      });

      return NextResponse.json({ ok: true, status: "order_approved" });
    }

    // ======================================================================================
    // 🟢 PAYMENT.CAPTURE.COMPLETED → this is the REAL payment success
    // ======================================================================================
    if (event.event_type === "PAYMENT.CAPTURE.COMPLETED") {
      const captureId = capture?.id;

      // 1. Fetch payment
      const payment = await supabase
        .from("payments")
        .select("*")
        .eq("provider_order_id", orderId)
        .maybeSingle();

      if (!payment.data) {
        return NextResponse.json({ ok: true, error: "payment_not_found" });
      }

      const { user_id, package_id } = payment.data;

      // 2. Fetch package to know how many downloads to add
      const pkg = await supabase
        .from("download_packages")
        .select("tracks")
        .eq("id", package_id)
        .maybeSingle();

      const creditsToAdd = pkg.data?.tracks || 0;

      // 3. Atomic update user balance
      await supabase.rpc("increment_download_balance", {
        user_id_param: user_id,
        count_param: creditsToAdd,
      });

      // 4. Update payment itself
      await updatePayment(orderId, {
        status: "completed",
        provider_capture_id: captureId,
        raw_webhook: event,
        processed_at: new Date().toISOString(),
      });

      return NextResponse.json({ ok: true, status: "completed" });
    }

    // ======================================================================================
    // 🔴 PAYMENT.CAPTURE.DENIED
    // ======================================================================================
    if (event.event_type === "PAYMENT.CAPTURE.DENIED") {
      await updatePayment(orderId, {
        status: "failed",
        raw_webhook: event,
        processed_at: new Date().toISOString(),
      });

      return NextResponse.json({ ok: true, status: "failed" });
    }

    // ======================================================================================
    // 🔵 PAYMENT.CAPTURE.REFUNDED
    // ======================================================================================
    if (event.event_type === "PAYMENT.CAPTURE.REFUNDED") {
      // Refund → remove credits
      const payment = await supabase
        .from("payments")
        .select("*")
        .eq("provider_order_id", orderId)
        .maybeSingle();

      if (payment.data) {
        const { user_id, package_id } = payment.data;

        const pkg = await supabase
          .from("download_packages")
          .select("tracks")
          .eq("id", package_id)
          .maybeSingle();

        const credits = pkg.data?.tracks || 0;

        // Deduct credits
        await supabase.rpc("decrement_download_balance", {
          user_id_param: user_id,
          count_param: credits,
        });
      }

      await updatePayment(orderId, {
        status: "refunded",
        raw_webhook: event,
        processed_at: new Date().toISOString(),
      });

      return NextResponse.json({ ok: true, status: "refunded" });
    }

    // ======================================================================================
    // ⚠️ CUSTOMER.DISPUTE.CREATED
    // ======================================================================================
    if (event.event_type === "CUSTOMER.DISPUTE.CREATED") {
      await updatePayment(orderId, {
        status: "disputed",
        raw_webhook: event,
        processed_at: new Date().toISOString(),
      });

      return NextResponse.json({ ok: true, status: "disputed" });
    }

    // ======================================================================================
    // 🟤 Default → ignore unused events
    // ======================================================================================
    return NextResponse.json({ ok: true, ignored: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return new NextResponse("Webhook error", { status: 500 });
  }
}