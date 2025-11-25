"use client";

import { Suspense } from "react";
import FaqSection from "@/components/FaqSection";
import PrimaryServices from "@/components/PrimaryServices";
import GetInTouch from "@/components/GetInTouch";
import Data from "@/Data/data.json";

const faqs = Data.primaryServices.faqs;

export default function Page() {
  return (
    <>
      <Suspense fallback={<div>Loading services...</div>}>
        <PrimaryServices />
      </Suspense>

<div className='px-s8'><FaqSection faqs={faqs} /></div>


      <GetInTouch
        variant="blue"
        height="470px"
        title="Need guidance?"
        subtitle="If you're dealing with an issue related to this service, feel free to reach out. We'll explain your options clearly and guide you through the right next steps."
      />
    </>
  );
}
