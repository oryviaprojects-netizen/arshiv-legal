import React from 'react'
import WhatShouldIDoNow from '@/components/WhatShouldIDoNow'
import FaqSection from '@/components/FaqSection'
import Data from '@/Data/data.json'
import GetInTouch from '@/components/GetInTouch';
const faqs = Data.primaryServices.faqs;
function page() {
  return (
    <>

      <WhatShouldIDoNow />
      <div className='px-s8'>
        <FaqSection faqs={faqs} />
      </div>
      <GetInTouch
        variant="white"
        height="220px"
        title="Start the Conversation That Can Change Everything"
        subtitle="No matter what issue you're facing, you don’t have to figure it out alone. Connect with us — we’re here to guide you with clarity."
      />
    </>

  )
}

export default page