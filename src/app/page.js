// /src/app/page.js
import React from 'react';
import dynamic from 'next/dynamic';
import AboutSection from '@/Sections/Home/AboutSection';
import DontHesitateSection from '@/Sections/Home/DontHesitateSection';
import ServicesSection from '@/Sections/Home/ServiceSecion';
import FaqSection from '@/components/FaqSection';
import GetInTouch from '@/components/GetInTouch';
import HeroSection from '@/Sections/Home/HeroSection';
import PrimaryServices from '@/components/PrimaryServices';
import Data from '@/Data/data.json';

// Dynamically import heavy or infrequently-critical sections to split bundles
const CaseStudy = dynamic(() => import('@/Sections/Home/CaseStudy'), {
  loading: () => <div aria-hidden className="py-12">Loading case studies…</div>
});
const PricingSection = dynamic(() => import('@/Sections/Home/PricingSection'), {
  loading: () => <div aria-hidden className="py-12">Loading pricing…</div>
});
const WhyChooseUs = dynamic(() => import('@/components/WhyChooseUs'), {
  loading: () => <div aria-hidden className="py-12">Loading…</div>
});
const HowWeWork = dynamic(() => import('@/Sections/Home/HowWeWork'), {
  loading: () => <div aria-hidden className="py-12">Loading…</div>
});

// Revalidate the page every 60 seconds (ISR) - adjust as needed
export const revalidate = 60;

const faqs = Data?.homePage?.faqs || [];

export default function Page() {
  return (
    <main role="main" className="mx-auto max-w-7xl px-s16 md:px-s32 py-s40 md:py-s48 lg:py-s64">
      <div className="flex flex-col space-y-s40 md:space-y-s48 lg:space-y-s64">
        {/* Hero: keep server-rendered for SEO / LCP */}
        <section aria-labelledby="hero-heading">
          <HeroSection />
        </section>

        <section aria-labelledby="about-heading">
          <AboutSection />
        </section>

        <section aria-labelledby="dont-hesitate-heading">
          <DontHesitateSection />
        </section>

        <section aria-labelledby="services-heading">
          <ServicesSection />
        </section>

        {/* These are dynamic imports - they will be code-split to reduce initial bundle */}
        <section aria-labelledby="case-study-heading">
          <CaseStudy />
        </section>

        <section aria-labelledby="why-choose-us-heading">
          <WhyChooseUs />
        </section>

        <section aria-labelledby="pricing-heading">
          <PricingSection />
        </section>

        <section aria-labelledby="how-we-work-heading">
          <HowWeWork />
        </section>

        <section aria-labelledby="faq-heading">
          <FaqSection faqs={faqs} />
        </section>

        <section aria-labelledby="contact-heading">
          <GetInTouch
            variant="blue"
            title="Start the Conversation That Can Change Everything"
            subtitle={
              "If you're dealing with an issue related to this service, feel free to reach out. We'll explain your options clearly and guide you through the right next steps."
            }
          />
        </section>
      </div>
    </main>
  );
}