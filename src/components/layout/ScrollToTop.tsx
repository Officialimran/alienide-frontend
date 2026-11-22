"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/** Floating green "back to top" button; scales in after scrolling. */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed right-[30px] bottom-[80px] z-[999] hidden h-[70px] w-[70px] items-center justify-center rounded-full border border-primary bg-primary text-[20px] text-white transition-transform duration-300 md:flex lg:bottom-[30px]",
        visible ? "scale-100" : "pointer-events-none scale-0",
      )}
    >
      <Icon name="arrow-top-right" className="-rotate-45" />
    </button>
  );
}
