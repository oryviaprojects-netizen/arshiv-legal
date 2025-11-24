import FaqSection from '@/components/FaqSection'
import PrimaryServices from '@/components/PrimaryServices'
import React from 'react'
import GetInTouch from '@/components/GetInTouch';
import Data from '@/Data/data.json'
  const faqs = Data.primaryServices.faqs;
function page() {
  return (
   <>
    <PrimaryServices/>
    <FaqSection faqs={faqs} />
     <GetInTouch
      variant="blue"
  height="470px"
  title="Need guidance?"
  subtitle="If you're dealing with an issue related to this service, feel free to reach out. We'll explain your options clearly and guide you through the right next steps."
      />
 
   </>
  )
}

export default page