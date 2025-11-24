import Gradient from '@/components/ui/Gradient'
import React from 'react'
import Data from '@/Data/data.json'
import GetInTouch from '@/components/GetInTouch';
  const {title,description} = Data.ourTeam;
function page() {
  return (
    <>
    <Gradient title={title} description={description}/>
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