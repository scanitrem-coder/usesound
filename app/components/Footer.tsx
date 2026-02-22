import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 text-zinc-400">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">

        {/* Brand */}
        <div className="text-sm">
          <p className="font-semibold text-zinc-200">UseSound</p>
          <p>© {new Date().getFullYear()} Alle Rechte vorbehalten</p>
        </div>

        {/* Links */}
        <nav className="flex flex-wrap gap-6 text-sm">
          <Link href="/license" className="hover:text-white transition">
            Lizenz
          </Link>
          
          <Link href="/agb" className="hover:text-white transition">
              AGB
            </Link>

            <Link href="/widerruf" className="hover:text-white transition">
              Widerrufsbelehrung
            </Link>

          <Link href="/faq" className="hover:text-white transition">
            FAQ
          </Link>

          <Link href="/impressum" className="hover:text-white transition">
            Impressum
          </Link>

          <Link href="/datenschutz" className="hover:text-white transition">
            Datenschutz
          </Link>
        </nav>

      </div>
    </footer>
  );
}
