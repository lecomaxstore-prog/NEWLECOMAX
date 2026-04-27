"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Don't track admin pages
    if (pathname.startsWith("/admin")) return;

    supabase.from("page_views").insert({
      path: pathname,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent || null,
    }).then(() => {
      // silent — tracking should never block UX
    });

    // Also fire GA4 page view on navigation
    if (typeof window !== "undefined" && (window as unknown as Record<string, unknown>).gtag) {
      (window as unknown as Record<string, (...args: unknown[]) => void>).gtag("config", "G-9N1CPZQ1HG", { page_path: pathname });
    }
  }, [pathname]);

  return null;
}
