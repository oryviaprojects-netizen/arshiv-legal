"use client";

import Image from "next/image";
import Data from "@/Data/data.json";

export default function DontHesitateSection() {
  const dontHesitate = Data.homePage["don’tHesitate"];
  if (!dontHesitate) return null;

  return (
    <section
      className="flex flex-col items-center gap-s64">
      {/* TITLE + GAVEL ICONS */}
      <div
        className="flex text-center items-center gap-s8">
        {/* Left Gavel */}
        <div className="w-1/3 lg:w-1/4">
          <Image
            src="/Images/gavel-brown-1.svg"
            alt="Gavel"
            width={200}
            height={40}
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="page-title-h2">
          {dontHesitate.title}
        </h2>
        {/* Right Gavel */}
        <div className="w-1/3 lg:w-1/4">
          <Image
            src="/Images/gavel-brown-1.svg"
            alt="Gavel"
            width={200}
            height={40}
            className="w-full h-full object-cover rotate-180"
          />
        </div>
      </div>
      {/* DESCRIPTION */}
      <div className="text-center">
        <span className="text-accent-main body-large">“</span>
        <span
          className="body-large text-main">
          {dontHesitate.description}
        </span>
        <span className="text-accent-main body-large">”</span>
      </div>
    </section>
  );
}
