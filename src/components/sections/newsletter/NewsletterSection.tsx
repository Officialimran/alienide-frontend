import Image from "next/image";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Reveal } from "@/components/ui/Reveal";
import { SubscribeForm } from "./SubscribeForm";

export function NewsletterSection() {
  return (
    <section aria-label="Newsletter and careers" className="bg-beige pb-[60px] lg:pb-[100px] xl:pb-[150px]">
      <div className="site-container flex flex-col max-md:px-0 lg:flex-row">
        {/* Newsletter card */}
        <div className="mb-[30px] flex flex-col items-center rounded-[20px] bg-white px-[15px] md:flex-row md:items-stretch md:pr-[30px] md:pl-[25px] lg:mr-[30px] lg:mb-0 lg:w-[65%] xl:rounded-[40px] 2xl:pr-[80px]">
          {/* Image (333px) and copy (360px) shrink proportionally when space is tight, like the original. */}
          <Reveal className="order-last self-center md:order-none md:mr-[52px] md:-mt-[65px] md:min-w-0 md:shrink md:basis-[333px] md:self-end">
            <Image
              src="/images/h1_img-5.png"
              alt="Happy kid holding a game console"
              width={333}
              height={461}
              className="w-[250px] md:w-full"
            />
          </Reveal>
          <div className="flex w-full max-w-[360px] flex-col justify-center py-[30px] text-center md:min-w-0 md:shrink md:basis-[360px] md:text-left">
            <Reveal
              as="h2"
              className="m-0 mb-[15px] font-anton text-[42px] leading-[1.185] font-normal text-black uppercase xl:text-[54px]"
            >
              In The Know
            </Reveal>
            <Reveal className="mb-[25px] [&_strong]:font-medium [&_strong]:text-accent">
              Join <strong>200k+ other subscribers</strong> and get the major announcements from Gamico Studio
              straight in your inbox.
            </Reveal>
            <Reveal>
              <SubscribeForm />
            </Reveal>
          </div>
        </div>

        {/* Careers card */}
        <div className="relative flex items-center justify-center rounded-[20px] bg-dark bg-[url(/images/h1_deco-2.png)] bg-right-bottom bg-no-repeat px-[15px] py-[30px] md:px-[30px] lg:w-[35%] xl:rounded-[40px]">
          <Reveal className="absolute top-[-100px] left-[-24px] hidden md:block">
            <Image src="/images/h1_img-6.png" alt="" width={215} height={204} />
          </Reveal>
          <Reveal className="absolute top-[14px] right-[-66px] max-md:right-[-20px] max-md:w-[100px]">
            <Image src="/images/h1_img-7.png" alt="" width={152} height={152} />
          </Reveal>
          <Reveal className="absolute bottom-[-7px] left-[-6px]">
            <Image src="/images/h1_img-8.png" alt="" width={112} height={112} />
          </Reveal>

          <div className="relative z-[1] max-w-[250px] text-center lg:text-left">
            <Reveal
              as="h2"
              className="m-0 mb-[15px] font-anton text-[30px] leading-none font-normal text-white uppercase"
            >
              interested in making magic with us?
            </Reveal>
            <Reveal className="mb-5 text-muted">See our current open roles.</Reveal>
            <Reveal>
              <ButtonLink href="#" className="max-md:!px-[25px] max-md:!py-[15px]">
                WORKING WITH US
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
