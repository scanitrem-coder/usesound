export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const { packageId, consent } = await req.json();

    if (!packageId) {
      return NextResponse.json({ error: "Missing packageId" }, { status: 400 });
    }

    if (!consent) {
      return NextResponse.json({ error: "Consent required" }, { status: 400 });
    }

    // 1️⃣ Проверяем пользователя
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const token = authHeader.replace("Bearer ", "");
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: "Invalid user" }, { status: 401 });
    }

    // 2️⃣ Получаем пакет
    const { data: pkg, error: pkgError } = await supabase
      .from("download_packages")
      .select("*")
      .eq("id", packageId)
      .eq("active", true)
      .single();

    if (pkgError || !pkg) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }

    // 3️⃣ Получаем PayPal access token
    const paypalAuth = await fetch(
      `${process.env.PAYPAL_BASE_URL}/v1/oauth2/token`,
      {
        method: "POST",
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              process.env.PAYPAL_CLIENT_ID +
                ":" +
                process.env.PAYPAL_SECRET
            ).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials",
      }
    );

    const authText = await paypalAuth.text();

    if (!paypalAuth.ok) {
      return NextResponse.json(
        { error: "PayPal auth failed", raw: authText },
        { status: 500 }
      );
    }

    const paypalAuthData = JSON.parse(authText);
    const accessToken = paypalAuthData.access_token;

    // 4️⃣ Создаём order
    const orderRes = await fetch(
      `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
       
       
        body: JSON.stringify({
  intent: "CAPTURE",
  purchase_units: [
    {
      custom_id: user.id,
      amount: {
        currency_code: "EUR",
        value: Number(pkg.price_eur).toFixed(2),
      },
    },
  ],
  application_context: {
    return_url: "https://usesound.vercel.app/pricing",
    cancel_url: "https://usesound.vercel.app/pricing",
    user_action: "PAY_NOW",
  },
}),


      }
    );

    const orderText = await orderRes.text();

    if (!orderRes.ok) {
      return NextResponse.json(
        { error: "PayPal order failed", raw: orderText },
        { status: 500 }
      );
    }

    const orderData = JSON.parse(orderText);

    if (!orderData.id) {
      return NextResponse.json(
        { error: "Invalid PayPal response", details: orderData },
        { status: 500 }
      );
    }

    // 5️⃣ Создаём payment (pending + consent)
    const { error: insertError } = await supabase.from("payments").insert({
      user_id: user.id,
      package_id: pkg.id,
      amount: pkg.price_eur,
      currency: "EUR",
      provider: "paypal",
      provider_order_id: orderData.id,
      status: "pending",

      consent_given: true,
      consent_timestamp: new Date().toISOString(),
      consent_version: "v1_2026_02",
    });

    if (insertError) {
      return NextResponse.json(
        { error: "DB insert failed", details: insertError },
        { status: 500 }
      );
    }

    return NextResponse.json({ orderID: orderData.id });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}