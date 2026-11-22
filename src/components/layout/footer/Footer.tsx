import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/layout/header/Logo";
import { Icon } from "@/components/ui/Icon";
import { footerBottomNav, footerColumns, siteConfig } from "@/data/site";
import { cn } from "@/lib/cn";
import { SocialBand } from "./SocialBand";

const columnTitle =
  "m-0 mb-[15px] text-center font-unbounded text-[16px] leading-[2] font-semibold text-white md:mb-[25px] md:text-left";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact">
      <SocialBand />

      <div className="bg-dark pt-[60px] pb-[30px] mx:pt-[80px] mx:pb-[40px] xl:pt-[150px] xl:pb-[70px]">
        <div className="site-container flex flex-wrap">
          {/* Brand column */}
          <div className="flex w-full flex-col pb-[30px] text-center md:w-1/2 md:pr-[60px] md:pb-0 md:text-left mx:w-[36%] xl:pr-[120px]">
            <Logo variant="light" className="mb-[30px] self-center md:self-start" />
            <p className="m-0 text-muted">
              Qamico is an independent game studio making original games for PC, consoles, and mobile platforms.
            </p>
            <hr className="my-[25px] border-0 border-t border-white/10" />
            <div className="flex flex-col items-center gap-[24px] md:flex-row md:items-start">
              <Icon name="office" className="text-[50px] text-primary" />
              <p className="m-0 text-muted">{siteConfig.address}</p>
            </div>
          </div>

          {/* Link columns */}
          <div className="flex w-full flex-wrap md:w-1/2 mx:w-[64%]">
            {footerColumns.map((col, i) => (
              <div
                key={col.title}
                // Spaces the first row of columns on tablet (2-column grid).
                className={cn("w-full pb-[30px] md:w-1/2 mx:w-1/3", i < 2 ? "mx:pb-0" : "md:pb-0")}
              >
                <h2 className={columnTitle}>{col.title}</h2>
                <ul className="m-0 list-none p-0 text-center md:text-left">
                  {col.links.map((link) => (
                    <li key={link.label} className="py-[5px] first:pt-0 last:pb-0">
                      <Link href={link.href} className="text-muted transition-colors duration-300 hover:text-primary-hover">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="w-full md:w-1/2 mx:w-1/3">
              <h2 className={columnTitle}>Say Hello</h2>
              <div className="text-center md:text-left">
                <a href={`mailto:${siteConfig.email}`} className="mb-[10px] block text-muted hover:text-primary-hover">
                  {siteConfig.email}
                </a>
                <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="mb-[10px] block font-semibold text-white">
                  {siteConfig.phone}
                </a>
                <Link
                  href="/contact-us"
                  className="font-unbounded text-[12px] leading-[36px] font-semibold text-primary uppercase underline transition-colors hover:text-white"
                >
                  Chat With Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider with the floating gamepad + bottom bar */}
      <div className="bg-dark">
        <div className="site-container">
          <div className="relative py-[60px]">
            <div className="h-[5px] w-full bg-white" />
            <Image
              src="/images/ft-img.png"
              alt=""
              width={171}
              height={155}
              className="absolute top-[2px] left-1/2 w-[140px] -translate-x-1/2 md:top-[0px] md:w-[171px] xl:ml-[30px]"
            />
          </div>

          <div className="flex flex-col items-center justify-between gap-[15px] pt-[30px] pb-[60px] md:flex-row md:pt-0 mx:pb-[70px]">
            <p className="m-0 text-center text-muted md:text-left">
              © {year}{" "}
              <Link href="/" className="text-primary hover:text-primary-hover">
                {siteConfig.name}
              </Link>
              . Template Designed by{" "}
              <a href="https://wpopal.com/" className="text-primary hover:text-primary-hover" rel="noopener">
                Opal_WP
              </a>
            </p>
            <ul className="m-0 flex list-none flex-wrap items-center justify-center p-0">
              {footerBottomNav.map((link) => (
                <li
                  key={link.label}
                  className="flex items-center after:mx-[10px] after:h-[14px] after:w-px after:bg-body last:after:hidden mx:after:mx-[15px] xl:after:mx-[20px]"
                >
                  <Link href={link.href} className="text-muted transition-colors hover:text-primary-hover">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
