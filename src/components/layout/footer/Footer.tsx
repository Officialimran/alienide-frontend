import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/layout/header/Logo";
import { Icon } from "@/components/ui/Icon";
import { MotionFx } from "@/components/ui/MotionFx";
import { RichText } from "@/components/ui/RichText";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import type { SiteSettings } from "@/lib/settings";
import type { FooterColumn, NavLink } from "@/types";
import { SocialBand } from "./SocialBand";

const columnTitle =
  "m-0 mb-[15px] text-center font-unbounded text-[16px] leading-[2] font-semibold text-white md:mb-[25px] md:text-left";

interface FooterProps {
  settings: SiteSettings;
  /** Footer menu items that have sub-items, one column each. */
  columns: FooterColumn[];
  /** Footer menu items without sub-items (bottom bar). */
  bottomLinks: NavLink[];
  /** URL of the page using the contact template ("Chat with us"). */
  contactHref?: string;
}

function FooterLink({ link, className }: { link: NavLink; className: string }) {
  return (
    <Link
      href={link.href}
      target={link.newTab ? "_blank" : undefined}
      rel={link.newTab ? "noopener noreferrer" : undefined}
      className={className}
    >
      {link.label}
    </Link>
  );
}

export function Footer({ settings, columns, bottomLinks, contactHref }: FooterProps) {
  const { email, phone, address } = settings;
  const year = new Date().getFullYear();
  const hasHello = Boolean(email || phone || contactHref);

  return (
    <footer id="contact">
      <SocialBand links={settings.socialLinks} />

      <div className="bg-dark pt-[60px] pb-[30px] mx:pt-[80px] mx:pb-[40px] xl:pt-[150px] xl:pb-[70px]">
        <div className="site-container flex flex-wrap">
          {/* Brand column */}
          <div className="flex w-full flex-col pb-[30px] text-center md:w-1/2 md:pr-[60px] md:pb-0 md:text-left mx:w-[36%] xl:pr-[120px]">
            <Logo src={settings.footerLogo} variant="light" className="mb-[30px] self-center md:self-start" />
            <RichText html={settings.footerContent} className="text-muted [&_p]:m-0" />
            {address && (
              <>
                <hr className="my-[25px] border-0 border-t border-white/10" />
                <div className="flex flex-col items-center gap-[24px] md:flex-row md:items-start">
                  <Icon name="office" className="text-[50px] text-primary" />
                  <p className="m-0 text-muted">
                    {address.href ? (
                      <a href={address.href} target="_blank" rel="noopener noreferrer" className="hover:text-primary-hover">
                        {address.value}
                      </a>
                    ) : (
                      address.value
                    )}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Link columns */}
          <div className="flex w-full flex-wrap md:w-1/2 mx:w-[64%]">
            {columns.map((col, i) => (
              <div
                key={`${col.title}-${i}`}
                // Spaces the first row of columns on tablet (2-column grid).
                className={cn("w-full pb-[30px] md:w-1/2 mx:w-1/3", i < 2 ? "mx:pb-0" : "md:pb-0")}
              >
                <h2 className={columnTitle}>{col.title}</h2>
                <ul className="m-0 list-none p-0 text-center md:text-left">
                  {col.links.map((link) => (
                    <li key={link.id ?? link.href + link.label} className="py-[5px] first:pt-0 last:pb-0">
                      <FooterLink link={link} className="text-muted transition-colors duration-300 hover:text-primary-hover" />
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {hasHello && (
              <div className="w-full md:w-1/2 mx:w-1/3">
                <h2 className={columnTitle}>Say Hello</h2>
                <div className="text-center md:text-left">
                  {email && (
                    <a href={email.href} className="mb-[10px] block text-muted hover:text-primary-hover">
                      {email.value}
                    </a>
                  )}
                  {phone && (
                    <a href={phone.href} className="mb-[10px] block font-semibold text-white">
                      {phone.value}
                    </a>
                  )}
                  {contactHref && (
                    <Link
                      href={contactHref}
                      className="font-unbounded text-[12px] leading-[36px] font-semibold text-primary uppercase underline transition-colors hover:text-white"
                    >
                      Chat With Us
                    </Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Divider with the floating gamepad + bottom bar */}
      <div className="bg-dark">
        <div className="site-container">
          <div className="relative py-[60px]">
            <div className="h-[5px] w-full bg-white" />
            <MotionFx
              scrollX={{ speed: 1 }}
              minWidth={768}
              className="absolute top-[2px] left-1/2 w-[140px] -translate-x-1/2 md:top-[0px] md:w-[171px] xl:ml-[30px]"
            >
              <Image src="/images/ft-img.png" alt="" width={171} height={155} className="w-full" />
            </MotionFx>
          </div>

          <div className="flex flex-col items-center justify-between gap-[15px] pt-[30px] pb-[60px] md:flex-row md:pt-0 mx:pb-[70px]">
            <p className="m-0 text-center text-muted md:text-left">
              {settings.copyright ?? (
                <>
                  © {year}{" "}
                  <Link href="/" className="text-primary hover:text-primary-hover">
                    {siteConfig.name}
                  </Link>
                </>
              )}
            </p>
            {bottomLinks.length > 0 && (
              <ul className="m-0 flex list-none flex-wrap items-center justify-center p-0">
                {bottomLinks.map((link) => (
                  <li
                    key={link.id ?? link.href + link.label}
                    className="flex items-center after:mx-[10px] after:h-[14px] after:w-px after:bg-body last:after:hidden mx:after:mx-[15px] xl:after:mx-[20px]"
                  >
                    <FooterLink link={link} className="text-muted transition-colors hover:text-primary-hover" />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
