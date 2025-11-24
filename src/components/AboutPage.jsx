"use client";

import Image from "next/image";
import Data from "@/Data/data.json";
import Gradient from "./ui/Gradient";
import HowWeWork from "@/Sections/Home/HowWeWork";

export default function AboutSection() {
  // ✔ Correct JSON path
  const { about } = Data;

  if (!about) return <p>About data missing.</p>;

  const { aboutSection ,title,description } = about;

  if (!aboutSection) return <p>About section missing.</p>;

  const {
    mission,
    whatWeDo,
    howWeHelp,
    whyArshivLegal,
    ourAssurance
  } = aboutSection;


  return (
    <section className="w-full bg-background space-y-s64">
      <Gradient title={title} description={description}/>
        <Image
          src="/Images/aboutImage.svg"       // <-- your pillar image
          alt="Ashoka Pillar"
          width={1920}
          height={500}
        />
      <div className="max-w-7xl mx-auto px-s32 space-y-s64">

        {/* MISSION */}
        <div>
          <h2 className="page-title-h2 text-accent-main mb-s16">
            {mission.title}
          </h2>
          <p className="body-large text-main max-w-7xl">
            {mission.description}
          </p>
        </div>

        {/* WHAT WE DO */}
        <div>
          <h2 className="page-title-h2 text-accent-main mb-s16">
            {whatWeDo.title}
          </h2>

          <p className="body-large text-main mb-s16">
            {whatWeDo.description}
          </p>

          <ul className="list-disc ml-s32 space-y-s8 body-large text-main">
            {whatWeDo.points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>

          <p className="body-large text-main mt-s16">
            {whatWeDo.footerNote}
          </p>
        </div>

        {/* HOW WE HELP */}
        <HowWeWork/>

        {/* WHY ARSHIV LEGAL (WITH PILLAR IMAGE) */}
       {/* WHY ARSHIV LEGAL (WITH PILLAR IMAGE) */}
{/* WHY ARSHIV LEGAL (WITH PILLAR IMAGE) */}
<div className="flex flex-nowrap gap-s16 lg:gap-s64 lg:px-s64 items-start w-full">

  {/* Image */}
  <Image
    src="/Images/pillar.svg"
    alt="Ashoka Pillar"
    width={164}
    height={492}
    className="object-cover w-[95px] sm:w-[80px] md:w-[155px] lg:w-[125px] "
  />

  {/* Text Block */}
  <div className="space-y-s16 w-full">

    {/* Why Arshiv Legal */}
    <div className="space-y-s16">
      <h2 className="subheading-h3 text-accent-main">
        {whyArshivLegal.title}
      </h2>
      <p className="body-large text-main">
        {whyArshivLegal.description}
      </p>
    </div>

    {/* OUR ASSURANCE */}
    <div className="space-y-s16">
      <h2 className="subheading-h3 text-accent-main">
        {ourAssurance.title}
      </h2>

      <ul className="list-disc ml-s32 space-y-s8 body-large text-main">
        {ourAssurance.points.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </div>

    <p className="body-large text-main">
      {ourAssurance.footerNote}
    </p>
  </div>

</div>

      </div>
    </section>
  );
}
