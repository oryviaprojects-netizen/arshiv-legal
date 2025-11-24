import GetInTouch from '@/components/GetInTouch'
import WhyChooseUs from '@/components/WhyChooseUs'
import { Divide } from 'lucide-react'
function server({ children }) {
  return (
    <div>
        {children}
      <div className='px-s16'>

      <GetInTouch
        variant="blue"
        height="470px"
        title="Need guidance?"
        subtitle="If you're dealing with an issue related to this service, feel free to reach out. We'll explain your options clearly and guide you through the right next steps."
      />
      </div>
    </div>
  )
}

export default server