"use client";
import React from "react";
import Data from "@/Data/data.json";
import PricingCard from "@/components/ui/Pricing";

export default function PricingSection() {
  const data = Data.homePage.pricingSection;
  const pricingList = data.pricing;

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto flex flex-col gap-s24 md:gap-s24 lg:gap-s32">
        {/* Heading */}
        <h2 className="page-title-h2 text-accent-main">
          Consultancy Charges
        </h2>
        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-s24 md:gap-s32 lg:gap-s48 px-s32">
          {pricingList.map((item, index) => (
            <div key={index} className="flex justify-center">
              <PricingCard
                title={item.title}
                star={item.star}
                price={item.price}
                details={item.details}
                buttonText={item.buttonText}
                variant={item.variant}
              />
            </div>
          ))}
        </div>
        {/* Footer Note */}
        <p className="text-center body-small text-disable">{data.footerNote}</p>
      </div>
    </section>
  );
}