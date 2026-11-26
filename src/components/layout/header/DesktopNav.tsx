"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLink } from "@/types";
import { cn } from "@/lib/cn";
import { isActiveItem, isCurrent } from "@/lib/nav";
import { Chevron } from "./Chevron";

interface DesktopNavProps {
  items: NavLink[];
  className?: string;
}

/** Top-level menu with fade/slide dropdowns on hover and keyboard focus. */
export function DesktopNav({ items, className }: DesktopNavProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className={className}>
      <ul className="m-0 flex list-none items-center p-0">
        {items.map((item) => (
          <li key={item.id ?? item.href + item.label} className="group/nav relative">
            <Link
              href={item.href}
              target={item.newTab ? "_blank" : undefined}
              rel={item.newTab ? "noopener noreferrer" : undefined}
              aria-current={isActiveItem(item, pathname) ? "page" : undefined}
              aria-haspopup={item.children ? "true" : undefined}
              className="flex items-center gap-[7px] px-[15px] py-[38px] font-unbounded text-[12px] leading-[1.6667] font-medium text-white uppercase transition-colors duration-300 group-hover/nav:text-primary group-focus-within/nav:text-primary xl:px-[18px]"
            >
              {item.label}
              {item.children && <Chevron />}
            </Link>

            {item.children && (
              <ul
                className={cn(
                  "invisible absolute top-full left-[-30px] z-[100] m-0 min-w-[280px] list-none translate-y-5 rounded-[20px] bg-white px-0 py-6 opacity-0 shadow-[0_0_50px_0_rgba(0,0,0,0.07)]",
                  "pointer-events-none transition-[opacity,transform,visibility] duration-300",
                  "group-focus-within/nav:pointer-events-auto group-focus-within/nav:visible group-focus-within/nav:translate-y-0 group-focus-within/nav:opacity-100",
                  "group-hover/nav:pointer-events-auto group-hover/nav:visible group-hover/nav:translate-y-0 group-hover/nav:opacity-100",
                )}
              >
                {item.children.map((child) => (
                  <li key={child.id ?? child.href + child.label}>
                    <Link
                      href={child.href}
                      target={child.newTab ? "_blank" : undefined}
                      rel={child.newTab ? "noopener noreferrer" : undefined}
                      className={cn(
                        "block w-full px-[45px] py-[7px] text-[14px] font-normal transition-colors duration-300 hover:text-primary",
                        isCurrent(child.href, pathname) ? "text-accent underline" : "text-body",
                      )}
                    >
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
