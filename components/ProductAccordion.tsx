"use client";

import { useState } from "react";
import ReviewSection from "./ReviewSection";

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      className={`transition-transform duration-200 flex-shrink-0 ${open ? "rotate-180" : ""}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function AccordionItem({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-neutral-200">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-5 text-left"
      >
        <span className="font-black text-[14px] uppercase tracking-[0.05em]">{title}</span>
        <ChevronIcon open={open} />
      </button>
      {open && <div className="pb-6">{children}</div>}
    </div>
  );
}

export default function ProductAccordion({
  description,
  features,
  descriptionImage,
  productSlug,
}: {
  description: string;
  features: string[];
  descriptionImage?: string;
  productSlug: string;
}) {
  return (
    <div className="mt-10 border-b border-neutral-200">
      {/* Description Produit */}
      <AccordionItem title="Description Produit" defaultOpen={true}>
        {descriptionImage ? (
          <div className="flex flex-col-reverse md:flex-row gap-6 md:gap-10 md:items-start">
            <div className="flex-1">
              <div className="w-8 h-[2px] bg-black mb-4" />
              <p className="text-[15px] text-neutral-700 leading-[1.8] tracking-wide">{description}</p>
            </div>
            <div className="w-full md:w-[520px] flex-shrink-0 overflow-hidden border border-neutral-100">
              <img src={descriptionImage} alt="description" className="w-full h-auto" />
            </div>
          </div>
        ) : (
          <div>
            <div className="w-8 h-[2px] bg-black mb-4" />
            <p className="text-[15px] text-neutral-700 leading-[1.8] tracking-wide max-w-2xl">{description}</p>
          </div>
        )}
      </AccordionItem>

      {/* Détails Du Produit */}
      <AccordionItem title="Détails Du Produit" defaultOpen={true}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-2">
          {features.map((f) => (
            <div key={f} className="flex items-start gap-2 text-[13px] text-neutral-700">
              <span className="flex-shrink-0 mt-[2px]">•</span>
              {f}
            </div>
          ))}
        </div>
      </AccordionItem>

      {/* Avis */}
      <AccordionItem title="Avis">
        <ReviewSection productSlug={productSlug} />
      </AccordionItem>
    </div>
  );
}
