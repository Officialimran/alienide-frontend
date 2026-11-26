"use client";

import { CmsImage } from "@/components/ui/CmsImage";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@/components/ui/Icon";

export interface LightboxImage {
  src: string;
  alt: string;
}

interface LightboxProps {
  images: LightboxImage[];
  index: number | null;
  onChange: (index: number | null) => void;
}

/** Full-screen image viewer with keyboard (←/→/Esc) and click navigation. */
export function Lightbox({ images, index, onChange }: LightboxProps) {
  const open = index !== null;
  const n = images.length;

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onChange(null);
      if (e.key === "ArrowRight") onChange((index + 1) % n);
      if (e.key === "ArrowLeft") onChange((index - 1 + n) % n);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [index, n, onChange]);

  if (!open || typeof document === "undefined") return null;
  const image = images[index];

  // Portalled so ancestors with transforms (scroll-reveal wrappers) can't trap `position: fixed`.
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/90 p-4 md:p-16"
      onClick={() => onChange(null)}
    >
      <figure className="relative m-0 max-h-full w-full max-w-[1200px]" onClick={(e) => e.stopPropagation()}>
        <CmsImage
          src={image.src}
          alt={image.alt}
          width={1200}
          height={800}
          sizes="(max-width: 1232px) 100vw, 1200px"
          className="mx-auto max-h-[80vh] w-auto rounded-[5px] object-contain"
          priority
        />
        <figcaption className="mt-3 flex justify-between text-[12px] text-white/70">
          <span>{image.alt}</span>
          <span>
            {index + 1} / {n}
          </span>
        </figcaption>
      </figure>

      <button
        type="button"
        aria-label="Close"
        onClick={() => onChange(null)}
        className="absolute top-4 right-4 text-[22px] text-white transition-colors hover:text-primary"
      >
        <Icon name="times" />
      </button>
      <button
        type="button"
        aria-label="Previous image"
        onClick={(e) => {
          e.stopPropagation();
          onChange((index - 1 + n) % n);
        }}
        className="slider-arrow absolute top-1/2 left-4 -translate-y-1/2 max-md:!h-10 max-md:!w-10"
      >
        <Icon name="long-arrow-left" />
      </button>
      <button
        type="button"
        aria-label="Next image"
        onClick={(e) => {
          e.stopPropagation();
          onChange((index + 1) % n);
        }}
        className="slider-arrow absolute top-1/2 right-4 -translate-y-1/2 max-md:!h-10 max-md:!w-10"
      >
        <Icon name="long-arrow-right" />
      </button>
    </div>,
    document.body,
  );
}
