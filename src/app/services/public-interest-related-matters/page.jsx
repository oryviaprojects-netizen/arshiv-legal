import SubServicePage from '@/components/SubServicePage'
import React from 'react'
import Data from '@/Data/data.json'
import WhyChooseUs from '@/components/WhyChooseUs';
import FaqSection from '@/components/FaqSection';
  const data = Data.subServices.publicMatters;
const faqs = data.faqs || [];
function page() {
   return (
     < div className='w-full flex flex-col justify-center gap-s48  md:gap-s64 '>
    <SubServicePage 
   title={data.title}
   description={data.description}
   shortIntro={data.shortIntro}
    covers={data.whatThisServiceCovers}
   cards={data.whatThisServiceCovers.cards}
 />
 <FaqSection faqs={faqs} />
 
     </div>
   )
}

export default page