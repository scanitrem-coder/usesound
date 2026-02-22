export const runtime = "nodejs";

import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { verifyPaypalSignature } from "@/lib/paypal";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export async function POST(req: Request) {
  const rawBody = await req.text();
  const headerList = await headers();

  try {

    // 🛡 Guard: если нет PayPal заголовков — не проверяем подпись
    if (!headerList.get("paypal-transmission-id")) {
      return new NextResponse("Missing PayPal headers", { status: 400 });
    }

    // 1️⃣ Verify signature
    const isValid = await verifyPaypalSignature(rawBody, headerList);

    if (!isValid) {
      return new NextResponse("Invalid signature", { status: 400 });
    }
    const event = JSON.parse(rawBody);

    // 2️⃣ Only handle capture completed for now
    if (event.event_type !== "PAYMENT.CAPTURE.COMPLETED") {
      return NextResponse.json({ ignored: true });
    }

    const capture = event.resource;

    const captureId = capture.id;
    const orderId = capture.supplementary_data?.related_ids?.order_id;
    const amount = parseFloat(capture.amount?.value ?? "0");
    const currency = capture.amount?.currency_code;
    const payerEmail = capture.payer?.email_address ?? null;

    if (!captureId || !orderId) {
      throw new Error("Missing capture or order ID");
    }

    // 3️⃣ Atomic DB call
    const supabaseAdmin = getSupabaseAdmin();
    
    const { error } = await supabaseAdmin.rpc(
      "apply_payment_atomic_v2",
      {
        p_event_id: event.id,
        p_event_type: event.event_type,
        p_order_id: orderId,
        p_capture_id: captureId,
        p_amount: amount,
        p_currency: currency,
        p_payer_email: payerEmail,
        p_raw: event,
      }
    );

    if (error) {
      console.error("RPC error:", error);
      return new NextResponse("DB error", { status: 500 });
    }

    return NextResponse.json({ ok: true });

  } catch (err) {
    console.error("Webhook fatal error:", err);
    return new NextResponse("Webhook error", { status: 500 });
  }
}