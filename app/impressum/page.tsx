export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 text-zinc-200">
      <section className="max-w-4xl mx-auto px-6 py-20 space-y-10">

        <h1 className="text-4xl font-bold">
          Impressum
        </h1>

        {/* Diensteanbieter */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Diensteanbieter</h2>
          <p>UseSound</p>
          <p>Inhaberin: Olena Trembetska</p>
          <p>Revutskogo Straße 18a</p>
          <p>02140 Kyiv</p>
          <p>Ukraine</p>
        </div>

        {/* Kontakt */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Kontakt</h2>
          <p>E-Mail: <a href="mailto:Scani_20@ukr.net" className="underline">Scani_20@ukr.net</a></p>
        </div>

        {/* Umsatzsteuer */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Umsatzsteuer</h2>
          <p>
            Umsatzsteuer-ID: nicht vorhanden
            Keine Umsatzsteuer-Identifikationsnummer vorhanden,
            da keine Umsatzsteuerpflicht gemäß geltendem Recht besteht.
          </p>
        </div>

        {/* Verantwortlich */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
          <p>Olena Trembetska</p>
          <p>Revutskogo Straße 18a</p>
          <p>02068 Kyiv</p>
          <p>Ukraine</p>
        </div>

        {/* Haftung */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Haftung für Inhalte</h2>
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten
            nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
            Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
            Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
            Tätigkeit hinweisen.
          </p>
        </div>

        {/* Urheberrecht */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Urheberrecht</h2>
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
            dem Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
            Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung
            des jeweiligen Autors bzw. Erstellers.
          </p>
        </div>

      </section>
    </main>
  );
}
