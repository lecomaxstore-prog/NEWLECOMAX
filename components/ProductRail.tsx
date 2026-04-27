"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import ProductCard from "./ProductCard";
import Link from "next/link";
import type { Product } from "@/lib/products";

export default function ProductRail({
  title,
  products,
  cta,
}: {
  title: string;
  products: Product[];
  cta?: { label: string; href: string };
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const VISIBLE = 4; // cards visible at once on desktop
  const total = products.length;
  const maxIndex = Math.max(0, total - VISIBLE);

  const scrollTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index] as HTMLElement;
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: "smooth" });
  }, []);

  const prev = () => {
    const next = Math.max(0, activeIndex - 1);
    setActiveIndex(next);
    scrollTo(next);
  };

  const next = () => {
    const n = Math.min(maxIndex, activeIndex + 1);
    setActiveIndex(n);
    scrollTo(n);
  };

  const goTo = (i: number) => {
    setActiveIndex(i);
    scrollTo(i);
  };

  useEffect(() => {
    setCanPrev(activeIndex > 0);
    setCanNext(activeIndex < maxIndex);
  }, [activeIndex, maxIndex]);

  // Stagger reveal on scroll-into-view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Reveal header
          const header = section.querySelector(".rail-header") as HTMLElement | null;
          if (header) header.classList.add("in");
          // Stagger cards
          const cards = section.querySelectorAll(".card-sr");
          cards.forEach((card, i) => {
            setTimeout(() => card.classList.add("in"), i * 75);
          });
          obs.unobserve(section);
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  // Sync dots on manual scroll
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const card = track.children[0] as HTMLElement;
      if (!card) return;
      const cardW = card.offsetWidth + 16; // gap-4 = 16px
      const idx = Math.round(track.scrollLeft / cardW);
      setActiveIndex(Math.min(idx, maxIndex));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [maxIndex]);

  return (
    <section ref={sectionRef} className="max-w-7xl mx-auto px-4 md:px-6 py-16">
      {/* Header */}
      <div className="rail-header sr sr-up flex items-end justify-between mb-8 border-b border-neutral-100 pb-6">
        <div>
          <h2 className="h-display text-3xl md:text-[2.6rem]">{title}</h2>
        </div>
        <div className="flex items-center gap-4">
          {/* Arrow buttons */}
          <div className="hidden md:flex items-center gap-1.5">
            <button
              onClick={prev}
              disabled={!canPrev}
              aria-label="Précédent"
              className={`w-9 h-9 border flex items-center justify-center transition-all duration-200
                ${canPrev
                  ? "border-neutral-300 bg-white hover:border-black hover:bg-black hover:text-white text-black"
                  : "border-neutral-100 text-neutral-300 cursor-not-allowed"
                }`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
            <button
              onClick={next}
              disabled={!canNext}
              aria-label="Suivant"
              className={`w-9 h-9 border flex items-center justify-center transition-all duration-200
                ${canNext
                  ? "border-neutral-300 bg-white hover:border-black hover:bg-black hover:text-white text-black"
                  : "border-neutral-100 text-neutral-300 cursor-not-allowed"
                }`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

          {cta && (
            <Link
              href={cta.href}
              className="group flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-neutral-500 hover:text-black transition-colors duration-200"
            >
              {cta.label}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-0.5 transition-transform duration-200">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          )}
        </div>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth -mx-4 px-4 md:mx-0 md:px-0"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {products.map((p) => (
          <div
            key={p.slug}
            className="card-sr min-w-[72%] sm:min-w-[42%] md:min-w-[calc(25%-12px)] flex-shrink-0"
            style={{ scrollSnapAlign: "start" }}
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>

      {/* Progress dots */}
      {total > VISIBLE && (
        <div className="flex items-center justify-center gap-1.5 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-[3px] rounded-full transition-all duration-300
                ${i === activeIndex ? "w-8 bg-black" : "w-3 bg-neutral-300 hover:bg-neutral-500"}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
