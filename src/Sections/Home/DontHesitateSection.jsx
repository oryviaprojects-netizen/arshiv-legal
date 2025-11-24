"use client";

import Image from "next/image";
import Data from "@/Data/data.json";

export default function DontHesitateSection() {
  const dontHesitate = Data.homePage["don’tHesitate"];
  if (!dontHesitate) return null;

  return (
    <section
      className="
        w-full 
        mx-auto
        max-w-7xl 
        bg-background
        flex flex-col items-center 
        gap-s64
      "
    >
      {/* TITLE + GAVEL ICONS */}
      <div
        className="
          flex text-center items-center lg:gap-s16
        "
      >
        {/* Left Gavel */}
        <Image
          src="/Images/gavel-brown-1.svg"
          alt="Gavel"
          width={84}
          height={16}
          className="object-contain md:w[181px] md:h-[36px] lg:w-[200px] lg:h-[40px]"
        />

        <h2 className="page-title-h2 text-main ">
          {dontHesitate.title}
        </h2>

        {/* Right Gavel */}
        <Image
          src="/Images/gavel-brown-1.svg"
          alt="Gavel"
          width={84}
          height={16}
          className="object-contain rotate-180 md:w[181px] md:h-[36px] lg:w-[200px] lg:h-[40px]"
        />
      </div>

      {/* DESCRIPTION */}
      <div className="text-center">
        <span className="text-accent-main body-large ">“</span>
        <span
          className="
          body-large 
          text-main">
          {dontHesitate.description}
          </span>
        <span className="text-accent-main body-large ">”</span>
        </div>
    </section>
  );
}
