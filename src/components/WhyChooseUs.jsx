"use client";

import Data from "@/Data/data.json";

export default function WhyChooseUs() {
  const { whyChooseUs } = Data.homePage;

  if (!whyChooseUs) return null;

  return (
    <section
      className="
        w-full 
        max-w-7xl 
        mx-auto 
        px-s8
        bg-background
      "
    >
      {/* Title */}
      <h2 className="page-title-h2 text-accent-main mb-s32 ">
        {whyChooseUs.title}
      </h2>

      {/* Paragraphs */}
      <div className="flex flex-col gap-s16">
        {whyChooseUs.points.map((p, index) => (
          <p 
            key={index}
            className="body-large text-main "
          >
            {p}
          </p>
        ))}
      </div>
    </section>
  );
}
