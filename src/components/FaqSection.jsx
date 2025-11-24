"use client";

import Accordion from "./ui/Acordian";

export default function FaqSection({ faqs = [] }) {
  if (!Array.isArray(faqs) || faqs.length === 0) {
    return null;   // No FAQs → don't render section
  }

  return (
    <section className="w-full bg-background px-s8">
      <div className="max-w-7xl mx-auto space-y-s32">

        <h2 className="page-title-h2 text-accent-main ">FAQ</h2>

        <div>
          {faqs.map((faq, index) => (
          <Accordion
            key={index}
            question={faq.question}
            answer={faq.answer}
            isLast={index === faqs.length - 1}
          />
        ))}
        </div>

      </div>
    </section>
  );
}
