"use client";

import Link from "next/link";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { socialBrands } from "@/data/site";

// Duplicated so Swiper's loop mode always has enough slides at 5-per-view.
const slides = [...socialBrands, ...socialBrands];

/** Green band with ghosted "INDIE GAMES STUDIO" behind an autoplaying social carousel. */
export function SocialBand() {
  return (
    <section
      aria-label="Follow us"
      className="relative flex min-h-[180px] flex-col items-center justify-center overflow-hidden bg-primary px-[15px] py-[30px] mx:min-h-[210px] mx:px-[30px] mx:py-[35px]"
    >
      <p
        aria-hidden="true"
        className="ghost-title m-0 text-center font-anton text-[60px] leading-[0.95] uppercase select-none md:whitespace-nowrap md:text-[80px] mx:text-[100px] lg:text-[120px] xl:text-[140px] 2xl:text-[160px]"
      >
        indie games studio
      </p>

      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
        <div className="site-container">
          <Swiper
            modules={[Autoplay]}
            loop
            speed={500}
            autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            slidesPerView={2}
            spaceBetween={15}
            breakpoints={{
              768: { slidesPerView: 3, spaceBetween: 30 },
              1025: { slidesPerView: 4, spaceBetween: 30 },
              1201: { slidesPerView: 5, spaceBetween: 30 },
            }}
          >
            {slides.map((brand, i) => (
              <SwiperSlide key={`${brand.name}-${i}`} className="!flex justify-center">
                <Link href={brand.href} aria-label={brand.name} className="group block max-w-full">
                  {/* Masked so the white artwork can turn black on hover, as on the original. */}
                  <span
                    className="block max-w-full bg-white transition-colors duration-300 group-hover:bg-accent"
                    style={{
                      width: brand.width,
                      aspectRatio: `${brand.width} / 48`,
                      WebkitMask: `url(${brand.logo}) center / contain no-repeat`,
                      mask: `url(${brand.logo}) center / contain no-repeat`,
                    }}
                  />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
