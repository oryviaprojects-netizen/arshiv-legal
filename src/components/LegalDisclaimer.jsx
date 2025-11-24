"use client";
import React from "react";
import { footerDisclaimer } from "@/Data/FooterItem";

export default function LegalDisclaimer() {
  return (
    <section className="max-w-5xl mx-auto px-s32 py-s40 space-y-s24">
      {/* Heading */}
      <h2 className="hero-h1 text-primary-main">Legal Disclaimer</h2>

      {/* Text Box */}
      <div className="bg-background my-s64">
        <div className=" body-large text-main ">
          {footerDisclaimer.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
