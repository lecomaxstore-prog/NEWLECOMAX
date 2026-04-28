import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";
import { CartProvider } from "@/components/CartContext";
import PageTracker from "@/components/PageTracker";
import AdminLayoutWrapper from "@/components/AdminLayoutWrapper";

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
      {/* Google Analytics GA4 */}
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-9N1CPZQ1HG" strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-9N1CPZQ1HG', { page_path: window.location.pathname });
      `}</Script>
      <body className="min-h-screen flex flex-col font-sans">
        <CartProvider>
          <PageTracker />
          <AdminLayoutWrapper>
            <AnnouncementBar />
            <Header />
          </AdminLayoutWrapper>
          <main className="flex-1">{children}</main>
          <AdminLayoutWrapper>
            <Footer />
          </AdminLayoutWrapper>
        </CartProvider>
      </body>
    </html>
  );
}
