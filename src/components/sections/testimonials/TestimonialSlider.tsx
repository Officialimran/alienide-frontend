"use client";

import { useRef, useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { Autoplay, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { CmsImage } from "@/components/ui/CmsImage";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import type { Testimonial } from "@/types";

type Slot = "prev" | "active" | "next" | "hidden";

const slotClass: Record<Slot, string> = {
  prev: "left-[-100%] flex",
  active: "left-0 flex",
  next: "left-full flex",
  hidden: "left-0 hidden",
};

export function TestimonialSlider({ items }: { items: Testimonial[] }) {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [active, setActive] = useState(0);
  const n = items.length;

  const slotOf = (i: number): Slot => {
    if (i === active) return "active";
    if (i === (active + 1) % n) return "next";
    if (i === (active - 1 + n) % n) return "prev";
    return "hidden";
  };

  return (
    <div className="relative -mx-[15px] md:-mx-[30px]">
      <Swiper
        modules={[Autoplay, Keyboard]}
        loop
        speed={600}
        slidesPerView={1}
        autoHeight
        spaceBetween={30}
        keyboard={{ enabled: true, onlyInViewport: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        onSwiper={(s) => {
          swiperRef.current = s;
        }}
        onSlideChange={(s) => setActive(s.realIndex)}
      >
        {items.map((t, i) => (
          <SwiperSlide key={`${t.name}-${i}`}>
            <blockquote className="m-0 px-[20px] text-center md:px-[90px]">
              <p className="m-0 mb-[30px] font-unbounded text-[22px] leading-[1.5] font-normal whitespace-pre-line text-accent md:text-[24px] lg:text-[30px]">
                “{t.quote.trim()}”
              </p>
            </blockquote>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        type="button"
        aria-label="Previous testimonial"
        onClick={() => swiperRef.current?.slidePrev()}
        className="slider-arrow absolute top-[120px] -translate-y-1/2 left-[15px] z-10 !h-10 !w-10 !text-[12px] md:top-[70px] md:left-[30px] md:!h-[60px] md:!w-[60px] md:!text-[16px]"
      >
        <Icon name="long-arrow-left" />
      </button>
      <button
        type="button"
        aria-label="Next testimonial"
        onClick={() => swiperRef.current?.slideNext()}
        className="slider-arrow absolute top-[120px] -translate-y-1/2 right-[15px] z-10 !h-10 !w-10 !text-[12px] md:top-[70px] md:right-[30px] md:!h-[60px] md:!w-[60px] md:!text-[16px]"
      >
        <Icon name="long-arrow-right" />
      </button>

      {/* Author avatars */}
      <div className="flex items-center justify-center">
        <div className="relative w-[90px] pt-[140px]">
          {items.map((t, i) => {
            const slot = slotOf(i);
            const isActive = slot === "active";
            return (
              <button
                key={`${t.name}-${i}`}
                type="button"
                onClick={() => swiperRef.current?.slideToLoop(i)}
                aria-label={`Show testimonial from ${t.name}`}
                aria-current={isActive}
                className={cn(
                  "absolute top-0 w-full cursor-pointer flex-col items-center transition-[left] duration-300",
                  slotClass[slot],
                )}
              >
                <span className="mb-[50px] flex min-h-[90px] items-center">
                  {t.avatar ? (
                    <CmsImage
                      src={t.avatar}
                      alt=""
                      width={90}
                      height={90}
                      className={cn(
                        "rounded-full object-cover transition-all duration-300",
                        isActive ? "h-[90px] w-[90px]" : "h-[60px] w-[60px]",
                      )}
                    />
                  ) : (
                    <span
                      className={cn(
                        "flex items-center justify-center rounded-full bg-primary font-anton text-accent uppercase transition-all duration-300",
                        isActive ? "h-[90px] w-[90px] text-[36px]" : "h-[60px] w-[60px] text-[24px]",
                      )}
                    >
                      {t.name.charAt(0)}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
          {items.map((t, i) => (
            <p
              key={`${t.name}-${i}`}
              aria-hidden={i !== active}
              className={cn(
                "pointer-events-none absolute bottom-0 left-1/2 m-0 flex -translate-x-1/2 gap-2 font-anton text-[18px] whitespace-nowrap uppercase transition-opacity duration-300",
                i === active ? "opacity-100" : "opacity-0",
              )}
            >
              <span className="text-accent">
                {t.name}
                {t.source ? "," : ""}
              </span>
              {t.source && <span className="text-muted">{t.source}</span>}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
