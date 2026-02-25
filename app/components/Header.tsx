"use client";

import Link from "next/link";
import { useAuth } from "../providers/AuthProvider";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function Header() {
  const { user, openLogin } = useAuth();
  const [balance, setBalance] = useState<number | null>(null);
useEffect(() => {
  if (!user) {
    setBalance(null);
    return;
  }

  const fetchBalance = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("downloads_balance")
      .eq("id", user.id)
      .single();

    if (!error && data) {
      setBalance(data.downloads_balance);
    }
  };

  fetchBalance();
}, [user]);

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
  {balance !== null && (
    <span className="ml-2 text-white/60">
      • {balance} downloads
    </span>
  )}
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