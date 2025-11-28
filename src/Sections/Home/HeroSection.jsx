"use client";
import Image from "next/image";
import Data from "@/Data/data.json";
import Button from "@/components/ui/Button";

export default function Hero() {
  const hero = Data?.homePage?.heroSection;

  if (!hero) return null;

  return (
    <section className="w-full bg-background overflow-hidden">
      {/* -------------------- MOBILE VIEW -------------------- */}
      {/* MOBILE VIEW */}
      <div className="lg:hidden w-full flex flex-col items-center">
        {/* IMAGE + GRADIENT */}
        <div className="relative w-full max-w-lg overflow-hidden flex justify-center">
          <div className="relative w-full flex justify-center">
            <Image
              src="/Images/hero.png"
              width={600}
              height={800}
              priority
              quality={100}
              alt="Lady Justice"
              className="w-full h-[400px] object-cover scale-[1.35] origin-top"
              style={{ objectFit: 'cover' }}
            />
            {/* GRADIENT OVERLAY */}
            <div
              className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
              style={{
                height: "400px",
                background: `linear-gradient(
                  to bottom,
                  rgba(255,250,238,0) 30%,
                  rgba(255,250,238,0.8) 60%,
                  rgba(255,250,238,1) 65%,
                  rgba(255,250,238,1) 100%
                )`,
              }}
            />
          </div>
        </div>
        {/* TEXT CONTENT */}
        <div className="relative w-full text-center space-y-4 z-10">
          <h1 className="hero-h1 text-primary-main">{hero.mainHeading}</h1>
          <p className="body-large text-text-secondary">
            {hero.subHeading}
          </p>
          <button className="px-8 py-3 bg-accent-main hover:bg-red-main text-white font-semibold rounded-lg transition-colors">
            {hero.ctaButton}
          </button>
        </div>
      </div>


      {/* -------------------- DESKTOP VIEW -------------------- */}
      <div className="hidden lg:flex max-w-7xl  h-screen mx-auto items-center justify-center">
        {/* TEXT */}
        <div className="spacing-y-s64">
          <h1 className="hero-h1 text-primary-main">{hero.mainHeading}</h1>
          <p className="body-large text-secondary">
            {hero.subHeading}
          </p>
          <Button children={hero.ctaButton} variant={"ctaAccent"} />
        </div>
        {/* IMAGE */}
        <div className="w-fit h-fti">
          <Image
            src="/Images/hero.png"
            width={600}
            height={1000}
            quality={100}
            alt="Lady Justice"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section >
  );
}