import type { Metadata } from "next";
import Link from "next/link";
import { PageBanner } from "@/components/layout/PageBanner";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { SupportCard } from "@/components/sections/contact/SupportCard";
import { Reveal } from "@/components/ui/Reveal";
import { office, supportTeam } from "@/data/contact";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Visit, call or write to the Qamico studio, or send us a message through the feedback form.",
};

const blockTitle = "m-0 mb-[30px] text-center font-anton text-[30px] leading-none font-normal text-accent uppercase md:text-left";

export default function ContactPage() {
  return (
    <>
      <PageBanner
        solid="Contact"
        outline="Us"
        image="/images/page-bc.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact Us" }]}
      />

      <section className="relative z-10 -mt-[100px] rounded-section bg-white pt-[60px] md:pb-[60px] mx:pt-[80px] mx:pb-[80px] lg:pb-0 xl:pt-[150px]">
        <div className="site-container">
          {/* Map + office card (card overlaps the map's bottom-right corner from 768px) */}
          <div className="flex flex-col md:mb-[30px] md:items-end xl:mb-[100px]">
            <div className="w-full overflow-hidden rounded-[20px]">
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent(office.mapQuery)}&t=m&z=10&output=embed&iwloc=near`}
                title={office.mapQuery}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-[350px] w-full border-0 md:h-[650px]"
              />
            </div>
            <Reveal className="relative flex min-h-[400px] w-full flex-col justify-center rounded-tl-[20px] rounded-br-[20px] bg-white text-center md:-mt-[400px] md:w-[350px] md:px-[30px] md:text-left mx:-mt-[450px] mx:min-h-[450px] mx:w-[450px] lg:px-[60px] xl:w-[500px] xl:px-[90px]">
              <h2 className="m-0 mb-[25px] font-anton text-[30px] leading-none font-normal text-accent uppercase">our office</h2>
              <ul className="m-0 list-none p-0">
                {office.details.map((d) => (
                  <li key={d.label} className="mb-[25px] last:mb-0">
                    <p className="m-0 font-unbounded text-[14px] leading-5 font-semibold text-accent">
                      {d.href ? (
                        <Link href={d.href} className="transition-colors hover:text-primary">
                          {d.value}
                        </Link>
                      ) : (
                        d.value
                      )}
                    </p>
                    <p className="m-0 text-muted">{d.label}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Black rule */}
          <div className="py-[50px]">
            <div className="h-[5px] bg-accent" />
          </div>

          {/* Feedback form + support contacts */}
          <div className="flex flex-col md:flex-row">
            <div className="w-full pb-[30px] md:w-1/2 md:pr-[15px] md:pb-0 mx:w-[65%] lg:w-[70%] xl:w-[75%]">
              <Reveal as="h2" className={blockTitle}>
                Feedback form
              </Reveal>
              <Reveal>
                <ContactForm />
              </Reveal>
            </div>
            <div className="min-h-[576px] w-full md:w-1/2 md:pl-[15px] mx:w-[35%] lg:w-[30%] xl:w-[25%]">
              <Reveal as="h2" className={blockTitle}>
                Contact support
              </Reveal>
              <div className="grid gap-[30px]">
                {supportTeam.map((person) => (
                  <Reveal key={person.name}>
                    <SupportCard person={person} />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
