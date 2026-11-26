import Link from "next/link";
import { Fragment, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";
import type { DetailCta, DetailFact } from "@/types";
import { PlayCircleIcon, SocialIcon, toSocialName } from "./SocialIcons";

const factTitle = "m-0 font-anton text-[18px] leading-[26px] font-normal text-accent uppercase";
const factValue = "m-0 font-unbounded text-[14px] leading-[30px] font-normal";

interface DetailOverviewProps {
  heading: string;
  /** Short lead shown above the content (the item's excerpt). */
  intro?: string;
  /** CMS HTML. */
  html?: string;
  cta?: DetailCta;
  facts: DetailFact[];
  socials?: { label: string; href: string }[];
  /** Custom sidebar replacing the grey facts card (e.g. the service sidebar). */
  aside?: ReactNode;
}

/** Overview copy + call-to-action, with the grey facts card on the right. */
export function DetailOverview({ heading, intro, html, cta, facts, socials = [], aside }: DetailOverviewProps) {
  const hasAside = Boolean(aside) || facts.length > 0 || socials.length > 0;

  return (
    <section className="site-container mb-[60px] flex flex-col md:flex-row mx:mb-[80px] xl:mb-[150px]">
      <div
        className={
          hasAside
            ? "w-full pb-[60px] md:w-[65%] md:pr-[30px] md:pb-0 mx:w-[70%] lg:w-[75%] lg:pr-[80px] xl:w-[74%] xl:pr-[110px]"
            : "w-full"
        }
      >
        <Reveal as="h2" className="m-0 mb-[30px] font-anton text-[54px] leading-none font-normal text-accent uppercase">
          {heading}
        </Reveal>
        <Reveal className="[&_p]:mb-[1.618em]">
          {intro && <p className="font-unbounded text-[18px] leading-[1.7143] font-normal text-dark">{intro}</p>}
          <RichText html={html} />
        </Reveal>
        {cta && (
          <Reveal>
            <Link
              href={cta.href}
              className="btn"
              target={cta.newTab ? "_blank" : undefined}
              rel={cta.newTab ? "noopener noreferrer" : undefined}
            >
              <span>{cta.label}</span>
              {cta.icon === "play" ? (
                <PlayCircleIcon className="h-5 w-5 transition-transform duration-300" />
              ) : (
                <Icon name="arrow-top-right" />
              )}
            </Link>
          </Reveal>
        )}
      </div>

      {aside && (
        // Stretches to the copy's height so a sticky sidebar can follow the scroll.
        <div className="w-full md:w-[35%] mx:w-[30%] lg:w-[25%] xl:w-[26%]">{aside}</div>
      )}

      {!aside && hasAside && (
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
            {socials.length > 0 && (
              <>
                <dt className={`${factTitle} mb-[10px]`}>Social media</dt>
                <dd className="m-0 flex flex-wrap gap-[15px]">
                  {socials.map((social) => {
                    const icon = toSocialName(social.label);
                    return (
                      <a
                        key={social.href}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="text-accent transition-all duration-300 hover:scale-110 hover:text-primary"
                      >
                        {icon ? (
                          <SocialIcon name={icon} className="h-[25px] w-[25px]" />
                        ) : (
                          <span className="font-anton text-[14px] leading-[25px] uppercase">{social.label}</span>
                        )}
                      </a>
                    );
                  })}
                </dd>
              </>
            )}
          </dl>
        </Reveal>
      )}
    </section>
  );
}
