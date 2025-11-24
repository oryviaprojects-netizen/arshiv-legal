// "use client";

import { useState } from "react";
import Image from "next/image";

export default function Accordion({ question, answer, isLast }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${!isLast ? "border-b border-accent-main" : ""}`}>
      
      {/* HEADER */}
      <button
        onClick={() => setOpen(!open)}
        className="
          w-full flex justify-between items-center
          py-s16
          text-left
          transition-all duration-200 hover:cursor-pointer
        "
      >
        <span className="body-default text-main">{question}</span>

        {/* CUSTOM ICON */}
        <Image
          src={open ? "/Images/balance_open.png" : "/Images/balance_close.png"}
          alt="toggle"
          width={28}
          height={28}
          className="transition-transform duration-300"
        />
      </button>

      {/* CONTENT */}
      <div
        className={`
          overflow-hidden transition-all duration-300
          ${open ? "max-h-[300px] py-s8" : "max-h-0 py-0"}
        `}
      >
        <p className="body-default text-secondary">{answer}</p>
      </div>
    </div>
  );
}
