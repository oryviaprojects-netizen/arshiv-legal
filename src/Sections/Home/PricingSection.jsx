"use client";

import React from "react";
import Data from "@/Data/data.json";
import PricingCard from "@/components/ui/Pricing";

export default function PricingSection() {
  const data = Data.homePage.pricingSection;
  const pricingList = data.pricing;

  return (
    <section className="w-full bg-background py-s64 px-s8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-s48">
          <h2 className="page-title-h2 text-accent-main">
            Consultancy Charges
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-s40 mb-s32">
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
        <p className="text-center body-small text-gray-600">{data.footerNote}</p>
      </div>
    </section>
  );
}