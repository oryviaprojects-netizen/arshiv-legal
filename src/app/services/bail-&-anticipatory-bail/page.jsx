import SubServicePage from '@/components/SubServicePage'
import React from 'react'
import FaqSection from '@/components/FaqSection';
import Data from '@/Data/data.json'
  const data = Data.subServices.bail;
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
<div className='px-s8'><FaqSection faqs={faqs} /></div>

 
     </div>
   )
}

export default page