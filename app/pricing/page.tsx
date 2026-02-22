"use client";
import PricingCards from "../components/PricingCards";
import CustomForm from "../components/CustomForm";
import PayPalCheckoutButton from "@/app/components/PayPalCheckoutButton";
export default function PricingPage() {
  return (
    <main className="bg-black text-white">

      {/* HERO */}
      <section className="py-24 text-center bg-gradient-to-b from-black to-zinc-950">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Transparente Preise. Keine Abos.
        </h1>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
          Wähle das passende Musikpaket für dein Projekt. 
          Einmal bezahlen – unbegrenzt nutzen.
        </p>
      </section>

      {/* PRICING CARDS */}
      <PricingCards />

{/* PACKAGE DETAILS FULL WIDTH */}

<section className="relative py-32 text-white overflow-hidden">

  {/* ОСНОВНОЙ ГРАДИЕНТ */}
  <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-black to-emerald-950"></div>

  {/* МЯГКОЕ СВЕЧЕНИЕ СВЕРХУ */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.18),transparent_60%)]"></div>

  {/* ДОПОЛНИТЕЛЬНАЯ ГЛУБИНА */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(16,185,129,0.25),transparent_70%)]"></div>

  <div className="relative w-full px-16">

  <h2 className="text-5xl font-bold mb-20">
    Detaillierte Informationen zu unseren Paketen
      </h2>
      
  <div className="grid md:grid-cols-2 gap-10">

    {/* BLOCK 1 */}
    <div className="p-10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-emerald-500/40 transition">
      <h3 className="text-2xl font-semibold mb-6">
        Was ist in den Paketen enthalten?
      </h3>
      <p className="text-lg text-zinc-400 mb-8">
        Mit dem Kauf eines Musikpakets erwerben Sie eine rechtssichere,
        nicht exklusive Lizenz zur kommerziellen Nutzung der ausgewählten Tracks.
        Es entstehen keine laufenden Kosten oder versteckten Gebühren.
      </p>
      <ul className="space-y-3 text-zinc-300">
        <li>✔ Kommerzielle Nutzung erlaubt</li>
        <li>✔ Nutzung für Social Media (Instagram, Facebook, TikTok)</li>
        <li>✔ Einsatz in Online-Werbung & Marketingkampagnen</li>
        <li>✔ Verwendung auf Websites & Landingpages</li>
        <li>✔ Nutzung in Kundenprojekten (z. B. Agenturen)</li>
        <li>✔ Zeitlich unbegrenzte Lizenz</li>
        <li>✔ Keine Abonnements oder Folgekosten</li>
      </ul>
    </div>

    {/* BLOCK 2 */}
    <div className="p-10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-emerald-500/40 transition">
      <h3 className="text-2xl font-semibold mb-6">
        Wie funktioniert der Download?
      </h3>
      <p className="text-lg text-zinc-400 mb-8">
        Nach erfolgreicher Zahlung erhalten Sie sofort Zugriff auf Ihre Downloads.
        Sie können beliebige Tracks aus unserer Musikbibliothek auswählen,
        bis Ihr Download-Limit erreicht ist.
      </p>
      <ul className="space-y-3 text-zinc-300">
        <li>✔ Sofortiger Zugriff nach Kauf</li>
        <li>✔ Flexible Track-Auswahl</li>
        <li>✔ Anzeige der verbleibenden Downloads</li>
        <li>✔ Sichere Download-Links</li>
      </ul>
    </div>

    {/* BLOCK 3 */}
    <div className="p-10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-emerald-500/40 transition">
      <h3 className="text-2xl font-semibold mb-6">
        Welche Musik steht zur Verfügung?
      </h3>
      <p className="text-lg text-zinc-400 mb-8">
        Unsere Bibliothek umfasst moderne, hochwertige Produktionen
        für Unternehmen, Werbung und Content Creator.
      </p>
      <ul className="space-y-3 text-zinc-300">
        <li>🎵 Corporate & Business Musik</li>
        <li>🎵 Cinematic & emotionale Tracks</li>
        <li>🎵 Elektronische & moderne Produktionen</li>
        <li>🎵 Hintergrundmusik für Social Media</li>
        <li>🎵 Instrumental oder mit Gesang</li>
      </ul>
    </div>

    {/* BLOCK 4 */}
    <div className="p-10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-emerald-500/40 transition">
      <h3 className="text-2xl font-semibold mb-6">
        Individuelle Komposition
      </h3>
      <p className="text-lg text-zinc-400 mb-8">
        Beim Custom-Paket erstellen wir eine maßgeschneiderte Komposition
        exakt nach Ihren Anforderungen. Sie bestimmen Stil, Tempo, Länge,
        Stimmung und – falls gewünscht – auch den Text.
      </p>
      <ul className="space-y-3 text-zinc-300">
        <li>✔ Individuelles Genre & Stilrichtung</li>
        <li>✔ Mit oder ohne Gesang</li>
        <li>✔ Individuelle Songtexte möglich</li>
        <li>✔ Anpassbare Länge (z. B. 15s, 30s, 60s)</li>
        <li>✔ Kommerzielle Nutzung für Ihr Projekt</li>
      </ul>
    </div>

  </div>
</div>


</section>
      
{/* CUSTOM MUSIC FORM SECTION */}
<section id="custom-form" className="py-24 bg-zinc-950 border-t border-zinc-800">

  <div className="max-w-3xl mx-auto px-6 text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-bold mb-4">
      Individuelle Musik anfragen
    </h2>
    <p className="text-zinc-400">
      Beschreiben Sie Ihre Wunschmusik – wir melden uns innerhalb von 24–48 Stunden.
    </p>
  </div>

  <div className="max-w-2xl mx-auto px-6">
    <CustomForm />
  </div>

</section>

    </main>
  );
}
