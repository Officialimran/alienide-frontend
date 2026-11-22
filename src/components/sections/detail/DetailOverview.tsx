import Link from "next/link";
import { Fragment } from "react";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import type { DetailCta, DetailFact } from "@/types";
import { PlayCircleIcon, SocialIcon, type SocialName } from "./SocialIcons";

const socials: SocialName[] = ["Facebook", "Instagram", "Youtube"];

const factTitle = "m-0 font-anton text-[18px] leading-[26px] font-normal text-accent uppercase";
const factValue = "m-0 font-unbounded text-[14px] leading-[30px] font-normal";

interface DetailOverviewProps {
  heading: string;
  intro: string;
  lead: string;
  body: string;
  cta: DetailCta;
  facts: DetailFact[];
}

/** Overview copy + call-to-action, with the grey facts card on the right. */
export function DetailOverview({ heading, intro, lead, body, cta, facts }: DetailOverviewProps) {
  return (
    <section className="site-container mb-[60px] flex flex-col md:flex-row mx:mb-[80px] xl:mb-[150px]">
      <div className="w-full pb-[60px] md:w-[65%] md:pr-[30px] md:pb-0 mx:w-[70%] lg:w-[75%] lg:pr-[80px] xl:w-[74%] xl:pr-[110px]">
        <Reveal as="h2" className="m-0 mb-[30px] font-anton text-[54px] leading-none font-normal text-accent uppercase">
          {heading}
        </Reveal>
        <Reveal className="[&_p]:mb-[1.618em]">
          <p>{intro}</p>
          <p className="font-unbounded text-[18px] leading-[1.7143] font-normal text-dark">{lead}</p>
          <p>{body}</p>
        </Reveal>
        <Reveal>
          <Link href={cta.href} className="btn">
            <span>{cta.label}</span>
            {cta.icon === "play" ? (
              <PlayCircleIcon className="h-5 w-5 transition-transform duration-300" />
            ) : (
              <Icon name="arrow-top-right" />
            )}
          </Link>
        </Reveal>
      </div>

      <Reveal
        as="aside"
        aria-label="Key facts"
        className="w-full self-start rounded-[20px] bg-[#f4f4f4] px-[30px] py-[45px] md:w-[35%] mx:w-[30%] lg:w-[25%] xl:w-[26%] xl:px-[60px]"
      >
        <dl className="m-0">
          {facts.map((fact) => (
            <Fragment key={fact.title}>
              <dt className={factTitle}>{fact.title}</dt>
              <dd className="m-0">
                {fact.href ? (
                  <Link href={fact.href} className={`${factValue} block text-primary hover:text-primary-hover`}>
                    {fact.value}
                  </Link>
                ) : (
                  <p className={factValue}>{fact.value}</p>
                )}
              </dd>
              <hr className="mt-[15px] mb-5 border-0 border-t border-line" />
            </Fragment>
          ))}
          <dt className={`${factTitle} mb-[10px]`}>Social media</dt>
          <dd className="m-0 flex gap-[15px]">
            {socials.map((name) => (
              <a
                key={name}
                href="#"
                aria-label={name}
                className="text-accent transition-all duration-300 hover:scale-110 hover:text-primary"
              >
                <SocialIcon name={name} className="h-[25px] w-[25px]" />
              </a>
            ))}
          </dd>
        </dl>
      </Reveal>
    </section>
  );
}
