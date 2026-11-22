import type { Metadata } from "next";
import Image from "next/image";
import { PageBanner } from "@/components/layout/PageBanner";
import { ButtonLink } from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "Page not found",
};

/** Rendered for any unknown URL (and for missing game/service slugs). */
export default function NotFound() {
  return (
    <>
      <PageBanner
        variant="compact"
        image="/images/page-bc.jpg"
        crumbs={[{ label: "Home", href: "/" }, { label: "404" }]}
      />

      <section className="site-container pt-[108px] pb-[235px]">
        <div className="relative text-center">
          <p
            aria-hidden="true"
            className="m-0 mb-20 font-anton text-[150px] leading-[130px] text-[#f42d39] uppercase lg:text-[300px] lg:leading-[280px]"
          >
            404
          </p>
          <Image
            src="/images/404-img.png"
            alt=""
            width={217}
            height={231}
            priority
            className="absolute top-20 left-1/2 -translate-x-1/2"
          />
          <h1 className="m-0 mb-5 font-anton text-[80px] leading-[88px] font-normal text-accent uppercase">
            Page Not Found
          </h1>
          <p className="m-0 mb-[1.618em] font-unbounded text-[18px] leading-8 font-normal text-body">
            We&apos;re not being able to find the page you&apos;re looking for
          </p>
          <ButtonLink href="/">back To Homepage</ButtonLink>
        </div>
      </section>
    </>
  );
}
