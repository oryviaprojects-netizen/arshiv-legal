import ContactForm from "@/Sections/contact/ContactForm";
import ContactMap from "@/Sections/contact/map";
import Testimonials from "@/Sections/contact/Testimonials";
import Data from "@/Data/data.json";
import Gradient from "@/components/ui/Gradient";
import { MapPinHouse, PhoneForwarded } from 'lucide-react';
import FaqSection from "@/components/FaqSection";

export default function ContactSection() {
  const { contactSection } = Data;
  const faqs =contactSection.faqs

  return (
    <main>
      <Gradient title={contactSection.title} />

      <section className="max-w-7xl mx-auto px-s16 space-y-s64 py-s64">

        <h2 className="page-title-h2 text-primary-main">
          {contactSection.subtitle}
        </h2>
        
        <p className="body-large text-main">{contactSection.description}</p>

        {/* CONTACT BOX */}
        <div className="max-w-5xl flex flex-col  mx-auto md:flex-row bg-[#FFD19C]/20 p-s32 rounded-r16 gap-s32 shadow">

          {/* LEFT SIDE (Address) */}
          <div className="md:w-1/2 title-h4 space-y-s24">
            <h3 className=" text-primary-main">{contactSection.address.title}</h3>
            <div className="flex gap-s8">
              <MapPinHouse size={24} color={"#804012"} />
              <div>
                <p className="body-default">{contactSection.address.line1}</p>
                <p className="body-default">{contactSection.address.line2}</p>
                <p className="body-default">{contactSection.address.line3}</p>
              </div>
            </div>

            <h3 className=" text-primary-main">{contactSection.address.phoneTitle}</h3>
           <div className="flex gap-s8">
             <PhoneForwarded size={24} color={"#804012"} />
            <p className="body-default">{contactSection.address.phoneNumber}</p>
           </div>
          </div>

          {/* RIGHT SIDE (Form) */}
          <div className="md:w-1/2 ">
            <ContactForm formData={contactSection.form} />
          </div>
        </div>

        {/* MAP */}
        <ContactMap embedUrl={contactSection.map.embedUrl} />

        {/* TESTIMONIALS */}
        <Testimonials
          list={contactSection.testimonials.list}
        />
      <FaqSection faqs={faqs}/>
      </section>
    </main>
  );
}
