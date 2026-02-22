export default function DatenschutzPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 text-zinc-200">
      <section className="max-w-4xl mx-auto px-6 py-20 space-y-10">

        <h1 className="text-4xl font-bold">
          Datenschutzerklärung
        </h1>

        {/* Allgemeine Hinweise */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">1. Allgemeine Hinweise</h2>
          <p>
            Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen.
            Wir verarbeiten Ihre Daten ausschließlich auf Grundlage der gesetzlichen
            Bestimmungen (DSGVO, TMG).
          </p>
        </div>

        {/* Verantwortliche Stelle */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">2. Verantwortliche Stelle</h2>
          <p>
            UseSound<br />
            Inhaberin: Olena Trembetska<br />
            Revutskogo Straße 18a<br />
            02140 Kyiv<br />
            Ukraine
          </p>
          <p>
            E-Mail: <a href="mailto:Scani_20@ukr.net" className="underline">
              Scani_20@ukr.net
            </a>
          </p>
        </div>

        {/* Erhebung von Daten */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">3. Erhebung und Verarbeitung personenbezogener Daten</h2>
          <p>
            Personenbezogene Daten werden nur erhoben, wenn Sie uns diese im Rahmen
            einer Bestellung, Registrierung oder Kontaktaufnahme freiwillig mitteilen.
          </p>
          <p>
            Dazu gehören insbesondere:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Name</li>
            <li>E-Mail-Adresse</li>
            <li>Zahlungsinformationen (über Stripe verarbeitet)</li>
            <li>Nutzungsdaten (z. B. Downloads)</li>
          </ul>
        </div>

        {/* Zahlungsanbieter */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">4. Zahlungsabwicklung (Stripe)</h2>
          <p>
            Die Zahlungsabwicklung erfolgt über den Zahlungsdienstleister Stripe.
            Stripe verarbeitet Zahlungsdaten eigenständig als Verantwortlicher.
          </p>
          <p>
            Weitere Informationen finden Sie in der Datenschutzerklärung von Stripe.
          </p>
        </div>

        {/* Hosting */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">5. Hosting & Server-Logfiles</h2>
          <p>
            Unser Hosting-Anbieter speichert automatisch Informationen in sogenannten
            Server-Logfiles, die Ihr Browser automatisch übermittelt. Dies sind z. B.:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>IP-Adresse</li>
            <li>Browsertyp</li>
            <li>Datum und Uhrzeit der Anfrage</li>
          </ul>
        </div>

        {/* Cookies */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">6. Cookies</h2>
          <p>
            Diese Website verwendet nur technisch notwendige Cookies, die für den
            Betrieb der Seite erforderlich sind.
          </p>
        </div>

        {/* Rechte */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">7. Ihre Rechte</h2>
          <p>Sie haben das Recht auf:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Auskunft über Ihre gespeicherten Daten</li>
            <li>Berichtigung unrichtiger Daten</li>
            <li>Löschung Ihrer Daten</li>
            <li>Einschränkung der Verarbeitung</li>
            <li>Datenübertragbarkeit</li>
          </ul>
        </div>

        {/* Speicherdauer */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">8. Speicherdauer</h2>
          <p>
            Ihre Daten werden nur so lange gespeichert, wie dies für die
            Vertragsabwicklung oder aufgrund gesetzlicher Aufbewahrungsfristen
            erforderlich ist.
          </p>
        </div>

      </section>
    </main>
  );
}
