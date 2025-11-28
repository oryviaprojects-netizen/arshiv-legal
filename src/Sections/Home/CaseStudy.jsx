"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Data from "@/Data/data.json";
import AnimatedGavelIcon from "@/components/AnimatedGavelIcon";

export default function CaseStudy() {
  const { caseStudies } = Data.homePage.servicesSection;

  const [open, setOpen] = useState(false);
  const [activeCase, setActiveCase] = useState(null);

  const handleOpen = (caseItem) => {
    setActiveCase(caseItem);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false); // trigger gavel animation

    setTimeout(() => {
      setActiveCase(null); // unmount AFTER animation completes
    }, 450); // match your gavel CSS duration (0.5s)
  };

  return (
    <section>
      {/* ⭐ CASE STUDIES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-s32 my-s32">
        {caseStudies.map((item) => (
          <button
            key={item.id}
            onClick={() => handleOpen(item)}
            className="cursor-pointer group flex justify-center"
          >
            <Image
              src={item.image}
              alt="Case Study"
              width={302}
              height={400}
              className="rounded-lg object-contain max-h-[400px] transition-transform duration-300 ease-out group-hover:-translate-y-3"
            />
          </button>
        ))}
      </div>


      {/* ⭐ POPUP (with delayed unmount) */}
      <AnimatePresence>
        {open && activeCase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-999 flex items-end justify-center"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ damping: "10" }}
              className="
                relative
                w-full
                max-w-7xl
                bg-[#f7f4ea]
                rounded-t-3xl
                shadow-2xl
                overflow-hidden
                border border-[#b48a76]
              "
            >
              {/* ⭐ GAVEL CLOSE BUTTON */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 z-[9999]">
                <AnimatedGavelIcon isOpen={open} onClick={handleClose} variant={"brown"} />
              </div>

              {/* ⭐ SCROLLABLE CONTENT */}
              <div className="w-full  max-h-[150vh] sm:max-h-[80vh] overflow-y-auto  mt-20 px-s16 pb-s32">
                <Image
                  src={activeCase.case}
                  width={2000}
                  height={2600}
                  alt="Case Study File"
                  className="w-full object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
