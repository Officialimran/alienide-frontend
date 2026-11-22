"use client";

import { useEffect, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: "left" | "right";
  label: string;
  children: ReactNode;
  className?: string;
}

/** Off-canvas panel with overlay, Escape-to-close and body scroll lock. */
export function Drawer({ open, onClose, side = "left", label, children, className }: DrawerProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[1000] transition-[visibility] duration-500",
        open ? "pointer-events-auto visible delay-0" : "pointer-events-none invisible",
      )}
      aria-hidden={!open}
    >
      <div
        className={cn(
          "absolute inset-0 bg-black/60 transition-opacity duration-500",
          open ? "opacity-100" : "opacity-0",
        )}
        onClick={onClose}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={label}
        inert={!open}
        className={cn(
          "absolute top-0 flex h-full w-[340px] max-w-[85vw] flex-col overflow-y-auto bg-white shadow-2xl transition-transform duration-500 ease-[var(--ease-smooth)]",
          side === "left" ? "left-0" : "right-0",
          open ? "translate-x-0" : side === "left" ? "-translate-x-full" : "translate-x-full",
          className,
        )}
      >
        {children}
      </aside>
    </div>
  );
}
