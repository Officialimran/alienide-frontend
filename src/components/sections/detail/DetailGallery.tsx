"use client";

import Image from "next/image";
import { useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { Keyboard, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";
import type { GalleryItem } from "@/types";
import { RuledHeading } from "./DetailFeatures";

interface DetailGalleryProps {
  items: GalleryItem[];
  /** Used to label slides for screen readers. */
  title: string;
  heading?: string;
}

/** Video + image slider (1290:680) driven by a centred thumbnail strip. */
export function DetailGallery({ items, title, heading = "Gallery" }: DetailGalleryProps) {
  const [main, setMain] = useState<SwiperInstance | null>(null);
  const [thumbs, setThumbs] = useState<SwiperInstance | null>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const syncEdges = (s: SwiperInstance) => setEdge({ start: s.isBeginning, end: s.isEnd });

  return (
    <section id="gallery" className="site-container mb-[60px] scroll-mt-10 mx:mb-[80px] xl:mb-[150px]">
      <RuledHeading>{heading}</RuledHeading>

      <Reveal>
        <div className="relative mb-[10px] overflow-hidden rounded-[20px]">
          <Swiper
            modules={[Thumbs, Keyboard]}
            onSwiper={(s) => {
              setMain(s);
              syncEdges(s);
            }}
            onSlideChange={syncEdges}
            thumbs={{ swiper: thumbs && !thumbs.destroyed ? thumbs : null }}
            keyboard={{ enabled: true, onlyInViewport: true }}
            speed={500}
          >
            {items.map((item, i) => (
              <SwiperSlide key={item.src}>
                <div className="relative aspect-[1290/680] bg-dark">
                  {item.kind === "video" ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${item.src}`}
                      title={`${title} – ${item.alt}`}
                      loading="lazy"
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full border-0"
                    />
                  ) : (
                    <Image
                      src={item.src}
                      alt={`${title} – ${item.alt}`}
                      fill
                      sizes="(max-width: 1350px) 100vw, 1290px"
                      priority={i === 2}
                      className="object-cover"
                    />
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => main?.slidePrev()}
            disabled={edge.start}
            className="slider-arrow absolute top-1/2 left-[30px] z-10 -translate-y-1/2 disabled:pointer-events-none disabled:opacity-35"
          >
            <Icon name="long-arrow-left" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => main?.slideNext()}
            disabled={edge.end}
            className="slider-arrow absolute top-1/2 right-[30px] z-10 -translate-y-1/2 disabled:pointer-events-none disabled:opacity-35"
          >
            <Icon name="long-arrow-right" />
          </button>
        </div>

        <div className="flex justify-center">
          <div className="inline-block max-w-full">
            <Swiper
              modules={[Thumbs]}
              onSwiper={setThumbs}
              slidesPerView="auto"
              spaceBetween={10}
              watchSlidesProgress
              className="gallery-thumbs"
            >
              {items.map((item, i) => (
                <SwiperSlide
                  key={item.src}
                  className={cn(
                    "!w-[140px] cursor-pointer overflow-hidden rounded-[10px] border-2 border-white transition-colors duration-300 hover:border-primary",
                    "[&.swiper-slide-thumb-active]:border-primary",
                  )}
                >
                  <Image
                    src={item.thumb}
                    alt={`Show ${item.alt.toLowerCase()}`}
                    width={140}
                    height={100}
                    sizes="140px"
                    className="h-[100px] w-full rounded-[8px] object-cover"
                    onClick={() => main?.slideTo(i)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
