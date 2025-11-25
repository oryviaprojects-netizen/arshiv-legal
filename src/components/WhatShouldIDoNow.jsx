"use client";

import React from "react";
import Image from "next/image";
import Data from "@/Data/data.json";
import Gradient from "./ui/Gradient";

export default function WhatShouldIDoNow() {
  const { whatShouldIDoNow } = Data;

  if (!whatShouldIDoNow) {
    return <p className="text-red-main p-s32">Data not found.</p>;
  }

  const { title, sections } = whatShouldIDoNow;

  return (
    <main className="w-full bg-background text-main space-y-s64">

      {/* 🔵 TOP GRADIENT BAR WITH TITLE */}
<div className="">
  <Gradient title={title}/>
</div>


      {/* CONTENT SECTIONS */}
      <section className="max-w-7xl mx-auto px-s16 md:px-s32 py-s64">
        <div className="flex flex-col gap-s64">
          {sections.map((section, index) => (
            <div key={index} className="flex flex-col gap-s24">

              {/* SECTION HEADING */}
              <h2 className="page-title-h2 text-accent-main">
                {section.heading}
              </h2>

              {/* PARAGRAPHS */}
              {section.paragraphs && (
                <div className="space-y-s12 body-large text-main leading-relaxed">
                  {section.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              )}

              {/* IMAGE */}
              {section.image && (
                <div className="w-full rounded-r8 overflow-hidden my-s24">
                  <Image
                    src={section.image}
                    alt="Legal Awareness"
                    width={1200}
                    height={600}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              )}

              {/* BULLETS */}
              {section.bullets && (
                <ul className="list-decimal pl-s24 space-y-s8 body-large text-main">
                  {section.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}

            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
