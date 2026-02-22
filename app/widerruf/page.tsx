export default function WiderrufPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 text-zinc-200">
      <section className="max-w-4xl mx-auto px-6 py-20 space-y-8">

        <h1 className="text-4xl font-bold">Widerrufsbelehrung</h1>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Widerrufsrecht</h2>
          <p>
            Verbraucher haben grundsätzlich das Recht, binnen vierzehn Tagen
            ohne Angabe von Gründen diesen Vertrag zu widerrufen.
          </p>
          <p>
            Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            Vorzeitiges Erlöschen des Widerrufsrechts bei digitalen Inhalten
          </h2>

          <p>
            Bei einem Vertrag über die Lieferung digitaler Inhalte, die nicht auf einem
            körperlichen Datenträger geliefert werden (z.B. Musik-Downloads oder
            Download-Guthaben), erlischt das Widerrufsrecht gemäß § 356 Abs. 5 BGB
            vorzeitig, wenn:
          </p>

          <ul className="list-disc list-inside space-y-2">
            <li>
              der Verbraucher ausdrücklich zugestimmt hat, dass mit der Ausführung
              des Vertrags vor Ablauf der Widerrufsfrist begonnen wird, und
            </li>
            <li>
              der Verbraucher bestätigt hat, dass er mit Beginn der Ausführung
              des Vertrags sein Widerrufsrecht verliert.
            </li>
          </ul>

          <p>
            Die Ausführung des Vertrags beginnt bei UseSound mit der sofortigen
            Bereitstellung des erworbenen Download-Guthabens nach erfolgreicher Zahlung.
          </p>

          <p>
            Spätestens mit dem ersten Download eines digitalen Inhalts wird der Vertrag
            vollständig ausgeführt.
          </p>

          <p className="font-medium">
            Mit Ihrer ausdrücklichen Zustimmung im Bestellprozess sowie mit dem
            Beginn des Downloads bestätigen Sie, dass Sie auf Ihr Widerrufsrecht
            verzichten.
          </p>
        </div>

      </section>
    </main>
  );
}