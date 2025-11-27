"use client";

import React from "react";
import Gradient from "@/components/ui/Gradient";
import ServiceCardSmall from "@/components/ui/ServiceCard";
import WhyChooseUs from "./WhyChooseUs";

export default function SubServicePage({ title, shortIntro, covers, cards, description }) {
  const total = cards?.length || 0;

  // optimized span logic
  const getCardSpan = (index) => {
    if (total <= 2) return "lg:col-span-3"; // 1 or 2 items take full row

    if (total % 3 === 0) return "col-span-1"; // normal grid

    const remainder = total % 3;
    const lastRowStart = total - remainder;

    return index >= lastRowStart ? "lg:col-span-3" : "col-span-1";
  };

  return (
    <main className="w-full bg-background text-main">
      <Gradient title={title} description={description} />

      <section className="max-w-7xl mx-auto px-s32 py-s40 md:py-s64 flex flex-col gap-s64">



        {/* WHAT THIS SERVICE COVERS */}
        <div className="flex flex-col gap-s32">
          <h2 className="page-title-h2 text-accent-main">{covers.heading}</h2>
          <p className="body-large">{covers.description}</p>

          {/* DYNAMIC GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-s24">
            {cards.map((card, index) => (
              <div key={index} className={getCardSpan(index)}>
                <ServiceCardSmall
                  title={card.title}
                  subtitle={card.subtitle}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="px-s16 md:px-s32">
        <WhyChooseUs />
      </div>
    </main>
  );
}
