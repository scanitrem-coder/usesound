"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Ist die Musik wirklich rechtssicher nutzbar?",
    answer:
      "Ja. Alle Tracks auf UseSound sind lizenzierte Originalmusik. Nach dem Kauf erhältst du eine kommerzielle Nutzungslizenz für dein Projekt.",
  },
  {
    question: "Wo darf ich die Musik verwenden?",
    answer:
      "Du darfst die Musik für Social Media, Webseiten, Werbung, Online-Shops, Imagefilme, Präsentationen und Podcasts nutzen.",
  },
  {
    question: "Muss ich die Musik zusätzlich bei der GEMA anmelden?",
    answer:
      "Nein. Unsere Musik ist GEMA-frei. Es entstehen keine zusätzlichen Gebühren.",
  },
  {
    question: "Wie funktioniert das Track-Limit bei Paketen?",
    answer:
      "Wenn du ein Paket kaufst, kannst du beliebige Tracks auswählen, bis dein Download-Limit erreicht ist. Es gibt kein Zeitlimit.",
  },
  {
    question: "Kann ich die Musik mehrfach verwenden?",
    answer:
      "Die Lizenz ist zeitlich unbegrenzt und projektbezogen. Für ein neues Projekt wird eine neue Lizenz benötigt.",
  },
  {
    question: "Bietet ihr auch individuell komponierte Musik an?",
    answer:
      "Ja. Wir komponieren Musik speziell für dein Unternehmen oder deine Kampagne. Kontaktiere uns für ein individuelles Angebot.",
  },
  {
    question: "Gibt es Abonnements?",
    answer:
      "Nein. Alle Käufe sind einmalige Zahlungen (One-Time Payment). Keine versteckten Kosten.",
  },
  {
    question: "Erhalte ich eine Rechnung?",
    answer:
      "Nach dem Kauf erhältst du automatisch eine Zahlungsbestätigung per E-Mail. Diese dient als offizieller Nachweis der Zahlung.",
  },
  {
    question: "Kann ich einen Track vor dem Kauf anhören?",
    answer:
      "Ja. Alle Tracks können vor dem Kauf vollständig angehört werden.",
  },
  {
    question: "Was passiert, wenn ich mein Download-Limit erreicht habe?",
    answer:
      "Du kannst jederzeit ein neues Paket erwerben. Bereits lizenzierte Tracks bleiben gültig.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // 👈 первый открыт

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden">

      {/* 🌌 Subtle Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full" />

      <div className="relative z-10 py-24 px-6">
        <div className="max-w-3xl mx-auto">

          <h1 className="text-4xl md:text-5xl font-bold mb-16 text-center tracking-tight">
            Häufige Fragen
          </h1>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="group border border-zinc-800/60 rounded-2xl backdrop-blur-sm bg-zinc-900/40 transition duration-300 hover:border-emerald-500/40 hover:shadow-[0_0_25px_rgba(16,185,129,0.15)]"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between items-center p-6 text-left"
                >
                  <span className="font-medium text-lg group-hover:text-emerald-400 transition">
                    {faq.question}
                  </span>

                  <ChevronDown
                    className={`transition-all duration-300 ${
                      openIndex === index
                        ? "rotate-180 text-emerald-400"
                        : "text-zinc-500 group-hover:text-emerald-400"
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    openIndex === index
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 text-zinc-300 leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
