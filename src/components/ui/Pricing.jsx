"use client";

import Button from "@/components/ui/Button";

export default function PricingCard({
  title,
  star = "",        // NEW PROP
  price,
  details,
  buttonText,
  variant = "free",
}) {
  const isStandard = variant === "standard";

  return (
    <div
      className={`
        min-w-[250px]  max-w-[350px]
        min-h-[350px] min-h-[450px]
        rounded-r16 
        p-s24 
        flex flex-col 
        gap-s16
        transition-all duration-300
        ${isStandard 
          ? "bg-background border border-primary-main shladow-sm "
          : "bg-primary-main text-secondary-light"}
      `}
    >

      {/* Title */}
      <h2
        className={`
          page-title-h2
          flex items-center justify-center gap-s8
          ${isStandard 
            ? "text-accent-main text-center" 
            : "text-background text-center"}
        `}
      >
        {/* Star (Free only) */}
        {star && <span className="text-secondary-main">{star}</span>}
        {title}
      </h2>

      {/* Price */}
      <p
        className={`
          body-small opacity-80 text-left w-full
          ${isStandard ? "text-main" : "text-background"}
        `}
      >
        {price}
      </p>

      {/* Divider */}
      <div
        className={`
          w-full h-[1px]
          ${isStandard ? "bg-primary-main" : "bg-secondary-light"}
        `}
      ></div>

      {/* Details */}
      <div
        className={`
          body-default opacity-90 whitespace-pre-line text-left
          ${isStandard ? "text-main" : "text-background"}
        `}
      >
        {details}
      </div>

      {/* Button */}
      <div className="mt-auto w-full">
        <Button 
          variant={isStandard ? "primary" : "ctaSecondary"}
          className="w-full"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
