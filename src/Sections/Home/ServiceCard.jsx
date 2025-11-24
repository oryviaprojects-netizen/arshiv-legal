"use client";

import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

export default function ServiceCard({
  image,
  title,
  description,
  matters,
  subTitle,
}) {
  return (
    <div
      className="
        w-full max-w-6xl mx-auto 
        px-s16 lg:px-s32
        flex flex-col lg:flex-row 
        items-start justify-center 
        gap-s24
      "
    >
      {/* LEFT IMAGE */}
      <div
        className="
          w-full 
          lg:w-[300px] 
          flex-shrink-0
        "
      >
        <div
          className="
            rounded-xl overflow-hidden shadow-md 
            w-full 
            h-[220px] sm:h-[300px] lg:h-[395px]
          "
        >
          <Image
            src={image}
            alt={title}
            width={300}
            height={400}
            className="lg:w-[300px] lg:h-[400px] w-full   object-cover"
          />
        </div>
      </div>

      {/* RIGHT CARD */}
  <div
  className="
    w-full 
    border-2 border-secondary-main 
    rounded-xl 
    p-10 
    bg-background shadow-sm 
    flex flex-col gap-s32  
  "
>

        <div>
          <h2 className="page-title-h2 text-accent-main mb-4 lg:mb-6">
            {title}
          </h2>

          <p className="body-large text-main mb-4 lg:mb-6">
            {description}
          </p>

          <h4 className="title-h4 mb-3">{subTitle}</h4>

          <div className="flex flex-col lg:flex-row lg:justify-between gap-4 lg:gap-0">
            <ul className="list-disc ml-6 body-default text-main space-y-1 max-w-[60ch]">
              {matters.map((m, idx) => (
                <li key={idx}>
                  <Link href={m.href} className="hover:text-accent-main">
                    {m.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Desktop CTA */}
            <div className="hidden lg:flex ">
              <Button
                variant="secondary"
                onClick={() => {
                  const focus = title.toUpperCase();
                  window.location.href = `/legal-services?focus=${encodeURIComponent(
                    focus
                  )}`;
                }}
                children={"More Services"}
              />
                
             
            </div>
          </div>
        </div>

        {/* Mobile CTA */}
        <div className="mt-6 lg:hidden">
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => {
              const focus = title.toUpperCase();
              window.location.href = `/legal-services?focus=${encodeURIComponent(
                focus
              )}`;
            }}
          >
            More Services
          </Button>
        </div>
      </div>
    </div>
  );
}
