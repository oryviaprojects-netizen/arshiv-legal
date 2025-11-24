// import Button from "@/components/ui/Button";
// import Footer from "@/components/Footer";
// import Navbar from "@/components/Navbar";
// import Image from "next/image";
// import GetInTouch from "@/components/GetInTouch";
// import PricingCard from "@/Sections/Home/Pricing";
// import FaqSection from "@/components/FaqSection";
// import PrivacyPolicyPage from "@/components/privacyPolicy";
// import TermsConditions from "@/components/Terms&Condition";
// import LegalDisclaimer from "@/components/LegalDisclaimer";
// import WhatShouldIDoNow from "@/components/WhatShouldIDoNow";
// import ServiceCard from "@/components/ui/ServiceCard";
// import SmallCard from "@/components/ui/SmallCard";
// import Data from "@/Data/data.json";
// import SubServicePage from "@/components/SubServicePage";
// import CardVariant from "@/components/ui/CardVariant";
// import SearchBar from "@/components/ui/SearchBar";
// import BlogVideoListingPage from "@/components/BlogListing";
// import WhyChooseUs from "@/components/WhyChooseUs";
// import AboutSection from "@/Sections/Home/AboutSection";
// import DontHesitateSection from "@/Sections/Home/DontHesitateSection";
// import ServicesSection from "@/Sections/Home/ServiceSecion";
//   const data = Data.subServices.propertyDisputes;
// export default function Home() {
//   return (
//     <div>
//       <h1 className="hero-h1 text-primary-main mx-s64">
//         Jai Shree Ram
//       </h1>
//       <h1 className="page-title-h2 text-secondary-main">
//         jai shree ram
//       </h1>
//       <h1 className="subheading-h3 text-accent-main">
//         jai shree ram
//       </h1>
//       <h1 className="title-h4 text-red-main">
//         jai shree ram
//       </h1>
//       <h1 className="body-large text-primary-light">
//         jai shree ram
//       </h1>
//       <h1 className="body-default text-secondary">
//         jai shree ram
//       </h1>
//       <h1 className="body-small text-disable">
//         jai shree ram
//       </h1>
//       <h1 className="caption text-secondary">
//         jai shree ram
//       </h1>

//       <Button variant={"secondary"}>Book a Call</Button>
//       <Button variant="destructive">Book a Call</Button>
//       <Button variant={"outliner"} as={"link"} href={"https://oryvia.in"}>Book a Call</Button>
//       <Button variant={"ctaAccent"} href={"https://oryvia.in"}>Book a Call</Button>
//       <Button variant={"ctaSecondary"} href={"https://oryvia.in"}>Book a Call</Button>
//       <Navbar />
//       <CardVariant
//   variant="blog"
//   image="/Images/blog.png"
//   title="Exploring Old Streets"
//   description="A history of marketplaces and architecture."
// />
// <SearchBar />
//       <CardVariant
//   variant="video"
//   image="/Images/video.png"
//   title="Exploring Old Streets"
//   description="A history of marketplaces and architecture."
// />
// <AboutSection/>
// <WhyChooseUs/>
// <DontHesitateSection/>
// <ServicesSection/>


//       <FaqSection />
//       <GetInTouch />
//       <WhatShouldIDoNow/>
//       <BlogVideoListingPage/>
// <SubServicePage
//   title={data.title}
//   shortIntro={data.shortIntro}
//   covers={data.whatThisServiceCovers}
//   cards={data.whatThisServiceCovers.cards}
// />
//       <PricingCard
//         star="*"
//         title="Free"
//         price="₹0 | First 10 Minutes"
//         details={`Talk to us about your concern and get clear,
// reliable legal direction at no cost.
// We’ll help you understand where you stand and what your next legal step could be.

// Start with clarity. No charge, no obligation.`}
//         buttonText="Contact us"
//         variant="free"
//       />


//       {/* <PrivacyPolicyPage /> */}
//       <TermsConditions/>
//       <LegalDisclaimer/>
//       <ServiceCard 
//         title="Service" 
//         subtitle="Detailed description of the service."
//       />
//       <ServiceCard 
//         title="Document Review"
//       />
//       <Footer/>


    


//       <SmallCard title={"Document Review"}/> 

  


//     </div>
//   );
// }


import React from 'react'
import AboutSection from '@/Sections/Home/AboutSection'
import WhyChooseUs from '@/components/WhyChooseUs'
import DontHesitateSection from '@/Sections/Home/DontHesitateSection'
import ServicesSection from '@/Sections/Home/ServiceSecion'
import PricingSection from '@/Sections/Home/PricingSection'
import FaqSection from '@/components/FaqSection'
import GetInTouch from '@/components/GetInTouch'
import HeroSection from '@/Sections/Home/HeroSection'
import { Divide } from 'lucide-react'
import CaseStudy from '@/Sections/Home/CaseStudy'
import HowWeWork from '@/Sections/Home/HowWeWork'
import PrimaryServices from '@/components/PrimaryServices'
import Data from '@/Data/data.json'

  const faqs = Data.homePage.faqs;
function page() {
  return (
    <div className='w-full flex flex-col justify-center gap-s48 px-s8 md:gap-s64  '>

        <HeroSection/>
        <AboutSection/>
      <DontHesitateSection />
      <ServicesSection />
      <CaseStudy/>
      <WhyChooseUs />
      <PricingSection />
      <HowWeWork/>
      <FaqSection faqs={faqs} />
      <GetInTouch 
      variant="blue"
  
  title="Start the Conversation That Can Change Everything "
  subtitle="If you're dealing with an issue related to this service, feel free to reach out. We'll explain your options clearly and guide you through the right next steps."
      />
 
    </div>
  )
}

export default page