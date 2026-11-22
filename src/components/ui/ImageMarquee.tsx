"use client";

import Image from "next/image";
import { useState } from "react";
import { Lightbox, type LightboxImage } from "@/components/ui/Lightbox";
import { cn } from "@/lib/cn";

interface ImageMarqueeProps {
  images: LightboxImage[];
  /** Scroll left-to-right instead of right-to-left. */
  reverse?: boolean;
  /** Seconds each image takes to travel its own width (Swiper "speed" on the original). */
  secondsPerImage?: number;
  className?: string;
}

/**
 * Continuously drifting photo strip (3 per container width above 880px,
 * 2 below) that pauses on hover; click a photo to enlarge it.
 */
export function ImageMarquee({ images, reverse, secondsPerImage = 40, className }: ImageMarqueeProps) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <div
        className={cn("group/strip flex overflow-hidden", className)}
        style={{ ["--marquee-duration" as string]: `${images.length * secondsPerImage}s` }}
      >
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy > 0}
            className={cn(
              "m-0 flex shrink-0 animate-marquee list-none gap-[30px] p-0 pr-[30px] group-hover/strip:[animation-play-state:paused] motion-safe-only",
              reverse && "[animation-direction:reverse]",
            )}
          >
            {images.map((image, i) => (
              <li
                key={`${image.src}-${i}`}
                className="w-[calc((100vw_-_60px)/2)] shrink-0 md:w-[calc((100vw_-_90px)/2)] mx:w-[calc((min(1290px,_100vw_-_60px)_-_60px)/3)]"
              >
                <button
                  type="button"
                  tabIndex={copy > 0 ? -1 : undefined}
                  onClick={() => setActive(i)}
                  aria-label={`Enlarge photo: ${image.alt}`}
                  className="group/photo relative block h-[240px] w-full cursor-zoom-in overflow-hidden rounded-[20px] md:h-auto md:aspect-[3/2]"
                >
                  <Image
                    src={image.src}
                    alt={copy > 0 ? "" : image.alt}
                    fill
                    sizes="(max-width: 880px) 50vw, 430px"
                    className="object-cover transition-transform duration-300 group-hover/photo:scale-105"
                  />
                </button>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <Lightbox images={images} index={active} onChange={setActive} />
    </>
  );
}
