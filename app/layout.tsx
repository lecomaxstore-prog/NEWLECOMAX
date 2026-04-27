import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import MobileNav from "@/components/MobileNav";
import { CartProvider } from "@/components/CartContext";

export const metadata: Metadata = {
  title: "L'ecomax | Sport, Style & Performance",
  description:
    "Boutique en ligne L'ecomax — chaussures, vêtements et accessoires pour le sport et le lifestyle. Livraison au Maroc.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col font-sans">
        <CartProvider>
          <AnnouncementBar />
          <Header />
          <main className="flex-1 pb-16 md:pb-0">{children}</main>
          <Footer />
          <MobileNav />
        </CartProvider>
      </body>
    </html>
  );
}
