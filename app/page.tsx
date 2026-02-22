import CustomForm from "./components/CustomForm";
import Link from "next/link";
export default function HomePage() {
  return (
    <main className="bg-white text-zinc-900">

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center text-center text-white overflow-hidden">

  {/* Фоновое изображение */}
  <div className="absolute inset-0">
    <img
      src="/hero.jpg"
      alt="Music background"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black/60"></div>
  </div>

  {/* Контент */}
  <div className="relative z-10 max-w-3xl px-6">

    <p className="text-emerald-400 uppercase tracking-widest mb-4">
      Lizenzierte Musik ohne laufende Gebühren
    </p>

    <h1 className="text-4xl md:text-6xl font-bold mb-6">
      Musik, die du legal nutzen kannst.
    </h1>

    <p className="text-lg md:text-xl text-zinc-300 mb-8">
      Hochwertige Musik für Social Media, Werbung und Business.<br />
      Einmal bezahlen. Für immer nutzen.
    </p>

    <div className="flex justify-center gap-4 flex-wrap">
      <a
        href="/music"
        className="bg-emerald-500 hover:bg-emerald-600 transition px-6 py-3 rounded-lg font-semibold text-black"
      >
        Musik entdecken
      </a>

      <a
        href="/license"
        className="border border-zinc-400 hover:border-white transition px-6 py-3 rounded-lg"
      >
        Lizenz ansehen
      </a>
    </div>

  </div>
</section>


      {/* Custom Music Section */}
<section className="bg-gradient-to-br from-emerald-950/40 via-zinc-900 to-blue-950/30 py-24 px-6 text-white">

  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

    {/* LEFT */}
    <div className="space-y-8">

      <span className="inline-block bg-emerald-500/10 text-emerald-400 px-4 py-1 rounded-full text-sm">
        Ihr individueller Sound
      </span>

      <h2 className="text-4xl md:text-5xl font-bold leading-tight">
        Maßgeschneiderte Musik <br />
        exklusiv für Ihr Projekt.
      </h2>

      <p className="text-zinc-300 text-lg max-w-xl">
        Beschreiben Sie Stil, Tempo, Stimmung, Gesang oder Botschaft –
        wir komponieren Ihren persönlichen Track.
        Mit oder ohne Vocals. Rechtssicher & professionell produziert.
      </p>

      <ul className="space-y-3 text-zinc-300">
        <li>✔ Individuelle Komposition nach Briefing</li>
        <li>✔ Mit oder ohne Gesang</li>
        <li>✔ Optimiert für Werbung & Social Media</li>
        <li>✔ Exklusive oder nicht-exklusive Nutzung möglich</li>
      </ul>

    </div>

    {/* RIGHT – FORM */}
    <div 
    id="custom-form"
    className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl">

      <h3 className="text-xl font-semibold mb-6">
        Individuelle Musik anfragen
      </h3>

      <CustomForm />

      <p className="text-xs text-zinc-500 mt-4">
        Antwort innerhalb von 48 Stunden.
      </p>

    </div>

  </div>

</section>


      {/* USE CASES */}
      <section className="py-20 bg-zinc-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Rechtssicher für jeden Einsatz
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              "Instagram & TikTok",
              "YouTube & Videos",
              "Online Werbung",
              "Websites & Apps",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border bg-white p-6 text-center shadow-sm"
              >
                <p className="font-semibold">{item}</p>
                <p className="text-sm text-zinc-500 mt-2">
                  Kommerzielle Nutzung erlaubt
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative py-24 text-white overflow-hidden">

  {/* Фоновое изображение */}
  <div className="absolute inset-0">
    <img
      src="/process.jpg"
      alt="Music process"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-black/80"></div>
  </div>

  <div className="relative z-10 max-w-6xl mx-auto px-6">

    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
      So funktioniert UseSound
    </h2>

    <div className="grid md:grid-cols-3 gap-8">

      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl text-center">
        <div className="text-4xl mb-4">💳</div>
        <h3 className="text-xl font-semibold mb-3">Paket kaufen</h3>
        <p className="text-zinc-300">
          Einmal bezahlen – keine Abos, keine Folgekosten.
        </p>
      </div>

      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl text-center">
        <div className="text-4xl mb-4">🎵</div>
        <h3 className="text-xl font-semibold mb-3">Tracks auswählen</h3>
        <p className="text-zinc-300">
          Lade beliebige Tracks aus unserer Musikbibliothek herunter.
        </p>
      </div>

      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl text-center">
        <div className="text-4xl mb-4">🚀</div>
        <h3 className="text-xl font-semibold mb-3">Überall nutzen</h3>
        <p className="text-zinc-300">
          Für Social Media, Werbung, Websites und Business.
        </p>
      </div>

    </div>

  </div>
</section>


{/* PRICING */}
<section className="py-24 bg-gradient-to-b from-black via-zinc-950 to-black text-white">

  <div className="max-w-7xl mx-auto px-6">

    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
      Flexible Musikpakete für dein Business
    </h2>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

      {/* STARTER */}
      <div className="bg-zinc-900/80 backdrop-blur border border-zinc-800 rounded-2xl overflow-hidden hover:border-emerald-500 hover:scale-[1.02] transition duration-300">

        <img
          src="/starter.jpg"
          alt="Starter Paket"
          className="w-full h-56 object-cover"
        />

        <div className="p-8">
          <h3 className="text-2xl font-bold mb-2">Starter</h3>
          <p className="text-zinc-400 mb-4">1 Track</p>

          <div className="text-4xl font-bold mb-6">€2</div>

          <ul className="space-y-3 text-zinc-300 mb-8 text-sm">
            <li>✔ Musik aus bestehender Bibliothek</li>
            <li>✔ Kommerzielle Nutzung</li>
            <li>✔ Zeitlich unbegrenzte Lizenz</li>
            <li>✔ Keine Abos</li>
          </ul>

          <button className="w-full bg-emerald-500 hover:bg-emerald-600 transition px-6 py-3 rounded-lg font-semibold text-black">
            Paket kaufen
          </button>
        </div>
      </div>

      {/* CREATOR */}
      <div className="bg-zinc-900/90 backdrop-blur border-2 border-emerald-500 rounded-2xl overflow-hidden relative shadow-lg shadow-emerald-500/10 hover:scale-[1.02] transition duration-300">

        <div className="absolute top-4 right-4 bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-full">
          Beliebt
        </div>

        <img
          src="/creator.jpg"
          alt="Creator Paket"
          className="w-full h-56 object-cover"
        />

        <div className="p-8">
          <h3 className="text-2xl font-bold mb-2">Creator</h3>
          <p className="text-zinc-400 mb-4">5 Tracks</p>

          <div className="text-4xl font-bold mb-6">€8</div>

          <ul className="space-y-3 text-zinc-300 mb-8 text-sm">
            <li>✔ Musik aus bestehender Bibliothek</li>
            <li>✔ Kommerzielle Nutzung</li>
            <li>✔ Zeitlich unbegrenzte Lizenz</li>
            <li>✔ Keine Abos</li>
            <li>✔ Beste Preis-Leistung</li>
          </ul>

          <button className="w-full bg-emerald-500 hover:bg-emerald-600 transition px-6 py-3 rounded-lg font-semibold text-black">
            Paket kaufen
          </button>
        </div>
      </div>

      {/* BUSINESS */}
      <div className="bg-zinc-900/80 backdrop-blur border border-zinc-800 rounded-2xl overflow-hidden hover:border-emerald-500 hover:scale-[1.02] transition duration-300">

        <img
          src="/business.jpg"
          alt="Business Paket"
          className="w-full h-56 object-cover"
        />

        <div className="p-8">
          <h3 className="text-2xl font-bold mb-2">Business</h3>
          <p className="text-zinc-400 mb-4">10 Tracks</p>

          <div className="text-4xl font-bold mb-6">€15</div>

          <ul className="space-y-3 text-zinc-300 mb-8 text-sm">
            <li>✔ Musik aus bestehender Bibliothek</li>
            <li>✔ Kommerzielle Nutzung</li>
            <li>✔ Zeitlich unbegrenzte Lizenz</li>
            <li>✔ Keine Abos</li>
            <li>✔ Ideal für Agenturen</li>
          </ul>

          <button className="w-full bg-emerald-500 hover:bg-emerald-600 transition px-6 py-3 rounded-lg font-semibold text-black">
            Paket kaufen
          </button>
        </div>
      </div>

      {/* CUSTOM MUSIC */}
      <div className="bg-zinc-900/90 backdrop-blur border-2 border-purple-500 rounded-2xl overflow-hidden relative shadow-lg shadow-purple-500/10 hover:scale-[1.02] transition duration-300">

        <div className="absolute top-4 right-4 bg-purple-500 text-black text-xs font-bold px-3 py-1 rounded-full">
          Individuell
        </div>

        <img
          src="/custom.jpg"
          alt="Individuelle Musik"
          className="w-full h-56 object-cover"
        />

        <div className="p-8">
          <h3 className="text-2xl font-bold mb-2">
            Originale Komposition
          </h3>

          <p className="text-zinc-400 mb-4">
            Maßgeschneiderte Musik nach Wunsch
          </p>

          <div className="text-4xl font-bold mb-6">
            ab €25
          </div>

          <ul className="space-y-3 text-zinc-300 mb-8 text-sm">
            <li>✔ Individueller Stil & Tempo</li>
            <li>✔ Mit oder ohne Gesang</li>
            <li>✔ Eigene Botschaft möglich</li>
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
  </div>
</section>


      {/* LICENSE – WHAT YOU CAN & CAN’T DO */}
<section className="py-24 bg-white">
  <div className="max-w-6xl mx-auto px-6">

    <h2 className="text-3xl font-bold text-center mb-4">
      Was du mit der Musik machen darfst
    </h2>

    <p className="text-center text-zinc-500 mb-16">
      Klare, einfache Lizenz – ohne versteckte Einschränkungen
    </p>

    <div className="grid md:grid-cols-2 gap-8">

      {/* ALLOWED */}
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8">
        <h3 className="text-xl font-semibold mb-6 text-green-700">
          ✅ Erlaubt
        </h3>

        <ul className="space-y-4 text-sm text-zinc-700">
          <li>✔ Kommerzielle Nutzung</li>
          <li>✔ Social Media (Instagram, TikTok, YouTube)</li>
          <li>✔ Werbung & Ads</li>
          <li>✔ Websites, Apps & Online-Projekte</li>
          <li>✔ Kundenvideos & Unternehmensprojekte</li>
          <li>✔ Zeitlich unbegrenzte Nutzung</li>
        </ul>
      </div>

      {/* NOT ALLOWED */}
      <div className="rounded-2xl border border-red-200 bg-red-50 p-8">
        <h3 className="text-xl font-semibold mb-6 text-red-700">
          ❌ Nicht erlaubt
        </h3>

        <ul className="space-y-4 text-sm text-zinc-700">
          <li>✖ Musik weiterverkaufen oder weitergeben</li>
          <li>✖ Tracks als eigene Musik veröffentlichen</li>
          <li>✖ Upload auf Spotify, Apple Music etc.</li>
          <li>✖ Teilen der Dateien mit Dritten</li>
          <li>✖ Nutzung ohne eigenes Projekt</li>
        </ul>
      </div>

    </div>

  </div>
</section>


      {/* FINAL CTA */}
<section className="py-24 bg-black text-white text-center">
  <h2 className="text-3xl font-bold mb-6">
    Musik nutzen – ohne rechtliche Sorgen
  </h2>

  <p className="text-zinc-400 mb-8">
    Klare Lizenz. Einmal bezahlen. Für immer nutzen.
  </p>

  <Link
    href="/music"
    className="inline-block bg-emerald-500 text-black px-10 py-4 rounded-xl font-semibold hover:bg-emerald-600 transition duration-300"
  >
    Musik entdecken
  </Link>
</section>


    </main>
  );
}
