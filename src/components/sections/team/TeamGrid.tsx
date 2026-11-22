"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import type { Swiper as SwiperInstance } from "swiper";
import { Keyboard, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { cn } from "@/lib/cn";
import type { TeamMember } from "@/types";
import { TeamCard } from "./TeamCard";
import { TeamSlide } from "./TeamSlide";

interface TeamGridProps {
  members: TeamMember[];
  /** Column/gap classes for the card grid (defaults to the home page layout). */
  gridClassName?: string;
  /** Extra cell rendered after the members (e.g. a "Join our team" card). */
  trailing?: ReactNode;
}

const defaultGrid = "grid-cols-1 gap-[15px] md:grid-cols-2 md:gap-[30px] mx:grid-cols-4";

/**
 * Team grid that swaps, in place, to a swipeable detail view
 * for the member that was clicked.
 */
export function TeamGrid({ members, gridClassName = defaultGrid, trailing }: TeamGridProps) {
  const [open, setOpen] = useState(false);
  const [popupHeight, setPopupHeight] = useState(0);
  const swiperRef = useRef<SwiperInstance | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const openAt = (index: number) => {
    swiperRef.current?.slideTo(index, 0);
    setOpen(true);
  };

  const close = useCallback(() => setOpen(false), []);

  // The popup is absolutely positioned; reserve its height while open.
  useEffect(() => {
    const node = popupRef.current;
    if (!node) return;
    const ro = new ResizeObserver(() => setPopupHeight(node.offsetHeight));
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <div
      data-open={open}
      className="group/team relative transition-[min-height] duration-500"
      style={{ minHeight: open ? popupHeight : undefined }}
    >
      <ul
        className={cn(
          "m-0 grid list-none p-0",
          gridClassName,
          open && "pointer-events-none",
        )}
        aria-hidden={open}
      >
        {members.map((member, i) => (
          <li
            key={member.name}
            className={cn("transition-all duration-300", open && "scale-[0.8] opacity-0")}
            style={{ transitionDelay: open ? `${i * 50}ms` : "0ms" }}
          >
            <TeamCard member={member} onOpen={() => openAt(i)} />
          </li>
        ))}
        {trailing && (
          <li className={cn("transition-all duration-300", open && "scale-[0.8] opacity-0")}>{trailing}</li>
        )}
      </ul>

      <div
        ref={popupRef}
        role="dialog"
        aria-label="Team member details"
        aria-hidden={!open}
        inert={!open}
        className={cn(
          "absolute top-0 left-0 z-[20] w-full bg-white transition-opacity duration-500",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-0 right-0 z-[30] text-accent transition-colors hover:text-primary"
        >
          <svg width="24" height="23" viewBox="0 0 23.691 22.723" fill="none" aria-hidden="true">
            <g transform="translate(-126.154 -143.139)">
              <line x2="23" y2="22" transform="translate(126.5 143.5)" stroke="currentColor" strokeWidth="2" />
              <path d="M0,22,23,0" transform="translate(126.5 143.5)" stroke="currentColor" strokeWidth="2" />
            </g>
          </svg>
        </button>

        <Swiper
          className="team-swiper !pb-[50px]"
          modules={[Pagination, Keyboard]}
          slidesPerView={1}
          spaceBetween={30}
          speed={600}
          keyboard={{ enabled: true, onlyInViewport: true }}
          pagination={{ clickable: true }}
          onSwiper={(s) => {
            swiperRef.current = s;
          }}
        >
          {members.map((member) => (
            <SwiperSlide key={member.name}>
              <TeamSlide member={member} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
