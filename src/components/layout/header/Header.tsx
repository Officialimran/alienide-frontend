"use client";

import { useCallback, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { mainNav } from "@/data/site";
import { DesktopNav } from "./DesktopNav";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

/** Transparent header that sits over the hero (not sticky, as on the original). */
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50">
        <div className="site-container grid grid-cols-[1fr_auto_1fr] items-center py-5 lg:flex lg:gap-5">
          <div className="flex items-center xl:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="flex text-[20px] text-white transition-colors hover:text-primary"
            >
              <Icon name="bars" />
            </button>
          </div>

          <div className="flex items-center lg:flex-1">
            <Logo priority className="lg:pr-[25px] xl:pr-[75px] 2xl:pr-[150px]" />
            <DesktopNav items={mainNav} className="hidden lg:block" />
          </div>

          {/* Keeps the logo centred between the menu button and the edge on small screens. */}
          <div aria-hidden="true" className="lg:hidden" />
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} items={mainNav} />
    </>
  );
}
