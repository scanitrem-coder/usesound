"use client";

import Link from "next/link";
import { useAuth } from "../providers/AuthProvider";
import { supabase } from "@/lib/supabase";

export default function Header() {
  const { user, openLogin } = useAuth();


const handleLogout = async () => {
  await supabase.auth.signOut();
};

  return (
    <header className="w-full border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="text-xl font-semibold text-white">
          UseSound
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
          <Link href="/" className="hover:text-white transition">
            Home
          </Link>
          <Link href="/music" className="hover:text-white transition">
            Musik
          </Link>
          <Link href="/pricing" className="hover:text-white transition">
            Preise
          </Link>
          <Link href="/license" className="hover:text-white transition">
            Lizenz
          </Link>
          <Link href="/faq" className="hover:text-white transition">
            FAQ
          </Link>
        </nav>

        
        {/* Right side */}
<div className="flex items-center gap-4 text-sm text-white/70">
  <button className="hover:text-white">DE</button>
  <span>|</span>
  <button className="hover:text-white">EN</button>
  <span>|</span>
  <button className="hover:text-white">UA</button>

  {user ? (
  <div className="flex items-center gap-3 ml-4">
    
    <div className="px-3 py-1 bg-zinc-800 border border-zinc-700 rounded-full text-xs text-emerald-400">
      {user.email}
    </div>

    <button
      onClick={handleLogout}
      className="px-3 py-1 border border-white/30 rounded hover:text-white hover:border-white transition"
    >
      Logout
    </button>
  </div>
) : (

  <button
  onClick={openLogin}
  className="ml-4 px-3 py-1 border border-white/30 rounded hover:text-white hover:border-white transition"
>
  Login
</button>

)}

</div>


      </div>
    </header>
  );
}