import type { Metadata } from "next";
import "./globals.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import AuthProvider from "./providers/AuthProvider";
import PayPalProvider from "./providers/PayPalProvider";

export const metadata: Metadata = {
  title: "UseSound – Lizenzierte Musik für Business",
  description: "Lizenzierte Musik für Social Media, Werbung und Unternehmen",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className="bg-zinc-950 text-zinc-100 antialiased min-h-screen flex flex-col">
        <AuthProvider>
          <PayPalProvider>
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </PayPalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}