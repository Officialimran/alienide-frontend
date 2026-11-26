"use client";

import { useState } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { Keyboard, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { CmsImage } from "@/components/ui/CmsImage";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";
import { cn } from "@/lib/cn";
import type { GalleryItem } from "@/types";
import { RuledHeading } from "./DetailFeatures";

interface DetailGalleryProps {
  items: GalleryItem[];
  /** Used to label slides for screen readers. */
  title: string;
  heading?: string;
  /** CMS HTML shown under the heading. */
  description?: string;
}

function Slide({ item, title, priority }: { item: GalleryItem; title: string; priority: boolean }) {
  const label = `${title} – ${item.alt}`;
  if (item.kind === "embed") {
    return (
      <iframe
        src={item.src}
        title={label}
        loading="lazy"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
    );
  }
  if (item.kind === "file") {
    return <video src={item.src} controls preload="metadata" aria-label={label} className="absolute inset-0 h-full w-full object-contain" />;
  }
  return <CmsImage src={item.src} alt={label} fill sizes="(max-width: 1350px) 100vw, 1290px" priority={priority} className="object-cover" />;
}

function Thumb({ item }: { item: GalleryItem }) {
  if (item.thumb) {
    return (
      <CmsImage
        src={item.thumb}
        alt={`Show ${item.alt.toLowerCase()}`}
        width={140}
        height={100}
        sizes="140px"
        className="h-[100px] w-full rounded-[8px] object-cover"
      />
    );
  }
  return (
    <span className="flex h-[100px] w-full items-center justify-center rounded-[8px] bg-dark text-[28px] text-white">
      <span className="sr-only">Show {item.alt}</span>
      <Icon name="long-arrow-right" />
    </span>
  );
}

/** Video + image slider (1290:680) driven by a centred thumbnail strip. */
export function DetailGallery({ items, title, heading = "Gallery", description }: DetailGalleryProps) {
  const [main, setMain] = useState<SwiperInstance | null>(null);
  const [thumbs, setThumbs] = useState<SwiperInstance | null>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const syncEdges = (s: SwiperInstance) => setEdge({ start: s.isBeginning, end: s.isEnd });

  if (items.length === 0) return null;

  return (
    <section id="gallery" className="site-container mb-[60px] scroll-mt-10 mx:mb-[80px] xl:mb-[150px]">
      <RuledHeading>{heading}</RuledHeading>
      {description && (
        <Reveal className="mx-auto -mt-[30px] mb-[60px] max-w-[760px] text-center">
          <RichText html={description} className="[&_p]:m-0 [&_p+p]:mt-4" />
        </Reveal>
      )}

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
              <SwiperSlide key={`${item.src}-${i}`}>
                <div className="relative aspect-[1290/680] bg-dark">
                  <Slide item={item} title={title} priority={i === 0} />
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
                  key={`${item.src}-${i}`}
                  onClick={() => main?.slideTo(i)}
                  className={cn(
                    "!w-[140px] cursor-pointer overflow-hidden rounded-[10px] border-2 border-white transition-colors duration-300 hover:border-primary",
                    "[&.swiper-slide-thumb-active]:border-primary",
                  )}
                >
                  <Thumb item={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
