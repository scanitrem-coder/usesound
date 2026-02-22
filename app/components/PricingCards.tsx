"use client";

import PayPalCheckoutButton from "@/app/components/PayPalCheckoutButton";

export default function PricingCards() {
  return (
    <section className="pb-24">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* STARTER */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-emerald-500 transition duration-300">
          <img
            src="/starter.jpg"
            alt="Starter Paket"
            className="w-full h-64 object-cover"
          />

          <div className="p-8">
            <h3 className="text-2xl font-bold mb-2">Starter</h3>
            <p className="text-zinc-400 mb-4">1 Track</p>

            <div className="text-5xl font-bold mb-6">€2</div>

            <ul className="space-y-3 text-zinc-300 mb-8">
              <li>✔ Musik aus bestehender Bibliothek</li>
              <li>✔ Kommerzielle Nutzung</li>
              <li>✔ Zeitlich unbegrenzte Lizenz</li>
              <li>✔ Keine Abos</li>
            </ul>

            <PayPalCheckoutButton packageId="b80a7483-922d-406a-b8cb-5e90683fd405" />
          </div>
        </div>

        {/* CREATOR */}
        <div className="bg-zinc-900 border-2 border-emerald-500 rounded-2xl overflow-hidden relative shadow-lg shadow-emerald-500/10">
          <div className="absolute top-4 right-4 bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-full">
            Beliebt
          </div>

          <img
            src="/creator.jpg"
            alt="Creator Paket"
            className="w-full h-64 object-cover"
          />

          <div className="p-8">
            <h3 className="text-2xl font-bold mb-2">Creator</h3>
            <p className="text-zinc-400 mb-4">5 Tracks</p>

            <div className="text-5xl font-bold mb-6">€8</div>

            <ul className="space-y-3 text-zinc-300 mb-8">
              <li>✔ Musik aus bestehender Bibliothek</li>
              <li>✔ Kommerzielle Nutzung</li>
              <li>✔ Zeitlich unbegrenzte Lizenz</li>
              <li>✔ Keine Abos</li>
              <li>✔ Beste Preis-Leistung</li>
            </ul>

            <PayPalCheckoutButton packageId="3410001f-c34e-442e-9952-0bc3c07416ac" />
          </div>
        </div>

        {/* BUSINESS */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-emerald-500 transition duration-300">
          <img
            src="/business.jpg"
            alt="Business Paket"
            className="w-full h-64 object-cover"
          />

          <div className="p-8">
            <h3 className="text-2xl font-bold mb-2">Business</h3>
            <p className="text-zinc-400 mb-4">10 Tracks</p>

            <div className="text-5xl font-bold mb-6">€15</div>

            <ul className="space-y-3 text-zinc-300 mb-8">
              <li>✔ Musik aus bestehender Bibliothek</li>
              <li>✔ Kommerzielle Nutzung</li>
              <li>✔ Zeitlich unbegrenzte Lizenz</li>
              <li>✔ Keine Abos</li>
              <li>✔ Ideal für Agenturen & Unternehmen</li>
            </ul>

            <PayPalCheckoutButton packageId="ea383009-b2ba-4435-8736-bfc74b4ccc90" />
          </div>
        </div>

        {/* CUSTOM */}
        <div className="bg-zinc-900 border-2 border-purple-500 rounded-2xl overflow-hidden relative shadow-lg shadow-purple-500/10">
          <div className="absolute top-4 right-4 bg-purple-500 text-black text-xs font-bold px-3 py-1 rounded-full">
            Individuell
          </div>

          <img
            src="/custom.jpg"
            alt="Individuelle Musik"
            className="w-full h-64 object-cover"
          />

          <div className="p-8">
            <h3 className="text-2xl font-bold mb-2">
              Originale Komposition
            </h3>

            <p className="text-zinc-400 mb-4">
              Maßgeschneiderte Musik nach Wunsch
            </p>

            <div className="text-5xl font-bold mb-6">
              ab €25
            </div>

            <ul className="space-y-3 text-zinc-300 mb-8">
              <li>✔ Individueller Stil & Tempo</li>
              <li>✔ Mit oder ohne Gesang</li>
              <li>✔ Eigene Botschaft & Lyrics möglich</li>
              <li>✔ Kommerzielle Nutzung</li>
            </ul>

            <a
              href="#custom-form"
              className="block w-full bg-purple-500 hover:bg-purple-600 transition px-6 py-3 rounded-lg font-semibold text-black text-center"
            >
              Anfrage senden
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}