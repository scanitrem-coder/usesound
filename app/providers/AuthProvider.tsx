"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type AuthContextType = {
  user: any;
  openLogin: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  openLogin: () => {},
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          setShowLoginModal(false);
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });

    if (error) {
      setMessage("Fehler: " + error.message);
    } else {
      setMessage(
        "Bitte überprüfe deine E-Mail – wir haben dir einen Login-Link gesendet."
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        openLogin: () => setShowLoginModal(true),
      }}
    >
      {children}

      {/* Глобальный Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-zinc-900 p-8 rounded-xl w-96 text-white space-y-4">

            <h2 className="text-xl font-bold text-center">
              Mit E-Mail anmelden
            </h2>

            <form onSubmit={handleLogin} className="space-y-4">

              <input
                type="email"
                placeholder="E-Mail eingeben"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700"
              />

              <button
                type="submit"
                className="w-full bg-emerald-500 text-black font-semibold py-3 rounded-lg"
              >
                Login-Link erhalten
              </button>

            </form>

            {message && (
              <p className="text-sm text-center text-zinc-400">
                {message}
              </p>
            )}

            <button
              onClick={() => {
                setShowLoginModal(false);
                setMessage("");
                setEmail("");
              }}
              className="w-full text-zinc-400 hover:text-white transition pt-2"
            >
              Abbrechen
            </button>

          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
}
