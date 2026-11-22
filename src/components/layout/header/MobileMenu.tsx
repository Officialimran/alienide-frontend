"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Drawer } from "@/components/ui/Drawer";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import { isActiveItem, isCurrent } from "@/lib/nav";
import type { NavLink } from "@/types";
import { Chevron } from "./Chevron";
import { Logo } from "./Logo";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  items: NavLink[];
}

/** Off-canvas navigation with accordion sub-menus (≤1200px). */
export function MobileMenu({ open, onClose, items }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const pathname = usePathname();

  return (
    <Drawer open={open} onClose={onClose} side="left" label="Mobile menu">
      <div className="flex items-center justify-between border-b border-line px-[30px] py-[25px]">
        <Logo variant="dark" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="text-[18px] text-accent transition-colors hover:text-primary"
        >
          <Icon name="times" />
        </button>
      </div>

      <nav aria-label="Mobile" className="px-[30px] py-5">
        <ul className="m-0 list-none p-0">
          {items.map((item) => {
            const isOpen = expanded === item.label;
            return (
              <li key={item.label} className="border-b border-line last:border-b-0">
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "block flex-1 py-[14px] font-unbounded text-[13px] font-medium uppercase transition-colors hover:text-primary",
                      isActiveItem(item, pathname) ? "text-primary" : "text-accent",
                    )}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-label={`Toggle ${item.label} submenu`}
                      onClick={() => setExpanded(isOpen ? null : item.label)}
                      className="flex h-9 w-9 items-center justify-center text-accent"
                    >
                      <Chevron className={cn("transition-transform duration-300", isOpen && "rotate-180")} />
                    </button>
                  )}
                </div>
                {item.children && (
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <ul className="m-0 list-none overflow-hidden p-0 pl-4">
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <Link
                            href={child.href}
                            onClick={onClose}
                            className={cn(
                              "block py-2 text-[14px] transition-colors hover:text-primary",
                              isCurrent(child.href, pathname) ? "text-accent underline" : "text-body",
                            )}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                      <li className="h-3" aria-hidden="true" />
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

    </Drawer>
  );
}
