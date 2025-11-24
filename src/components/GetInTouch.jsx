"use client";

import Button from "@/components/ui/Button";

export default function GetInTouch({
  variant = "blue",
  title,
  subtitle,
}) {
  const isBlue = variant === "blue";

  return (
    <section
      className={`
        w-full max-w-7xl mx-auto my-s64 
        rounded-r8 px-s8 py-s64 
        flex flex-col items-center text-center gap-s24 
        ${isBlue ? "bg-primary-main text-background" : "bg-background text-main"}
      `}
    >
      {/* Title */}
      <h2
        className={`
          subheading-h3
          ${isBlue ? "text-background" : "text-primary-main"}
        `}
      >
        {title}
      </h2>

      {/* Subtitle */}
      <p
        className={`
          body-default 
          ${isBlue ? "text-background max-w-3xl" : "text-secondary max-w-2xl"}
        `}
      >
        {subtitle}
      </p>

      {/* Button */}
      <Button
        variant="ctaSecondary"
        as="link"
        href="/contact-us"
      >
        Get in touch
      </Button>
    </section>
  );
}
