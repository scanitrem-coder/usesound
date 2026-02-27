"use client";

import { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { createClient } from "@supabase/supabase-js";

export default function PayPalCheckoutButton({
  packageId,
}: {
  packageId: string;
}) {
  const [consent, setConsent] = useState(false);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  return (
    <div className="space-y-6">

      {/* ✅ 1. ЧЕКБОКС */}
      <label className="flex items-start gap-3 text-sm text-zinc-300">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1"
        />
        <span>
          Ich stimme zu, dass die digitalen Inhalte sofort bereitgestellt werden, und weiß, dass ich dadurch mein Widerrufsrecht verliere (§ 356 Abs. 5 BGB).
        </span>
      </label>

      {/* ✅ 2. PAYPAL КНОПКА */}
      <PayPalButtons
        style={{ layout: "vertical" }}
        disabled={!consent} // 🔥 блокировка без галочки

        createOrder={async () => {
          if (!consent) {
            alert("Bitte Zustimmung bestätigen.");
            throw new Error("Consent missing");
          }

          const {
            data: { session },
          } = await supabase.auth.getSession();

          if (!session) {
            alert("Bitte zuerst einloggen.");
            throw new Error("Not authenticated");
          }

          const res = await fetch("/api/paypal/create-order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${session.access_token}`,
            },
            body: JSON.stringify({
              packageId,
              consent: true, // ✅ отправляем в backend
            }),
          });

          const data = await res.json();

          if (!data.orderID) {
            throw new Error("Order creation failed");
          }

          return data.orderID;
        }}

        onApprove={async (data) => {
  const res = await fetch("/api/paypal/capture-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      orderID: data.orderID,
    }),
  });

  const result = await res.json();

  if (!res.ok) {
    console.error("Capture error:", result);
    alert("Zahlung fehlgeschlagen.");
    return;
  }

  setTimeout(() => {
    window.location.reload();
  }, 1500);
}}

        onError={(err) => {
          console.error("PayPal Error:", err);
          alert("Fehler bei der Zahlung.");
        }}
      />

    </div>
  );
}