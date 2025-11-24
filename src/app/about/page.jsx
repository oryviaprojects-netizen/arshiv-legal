import AboutSection from '@/components/AboutPage'
import GetInTouch from '@/components/GetInTouch'
import React from 'react'

function page() {
  return (
   <>
   <AboutSection/>
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