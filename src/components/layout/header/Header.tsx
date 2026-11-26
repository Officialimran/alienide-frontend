"use client";

import { useCallback, useState } from "react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import type { NavLink } from "@/types";
import { DesktopNav } from "./DesktopNav";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

interface HeaderProps {
  /** Header menu from the CMS. */
  items: NavLink[];
  /** Logo shown over the dark hero. */
  logo?: string;
  /** Logo for the white mobile drawer. */
  drawerLogo?: string;
  /** Optional call-to-action (Site options → header button). */
  button?: { label: string; href: string; newTab: boolean };
}

/** Transparent header that sits over the hero (not sticky, as on the original). */
export function Header({ items, logo, drawerLogo, button }: HeaderProps) {
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
            <Logo src={logo} priority className="lg:pr-[25px] xl:pr-[75px] 2xl:pr-[150px]" />
            <DesktopNav items={items} className="hidden lg:block" />
          </div>

          {button ? (
            <div className="hidden justify-end lg:flex">
              <ButtonLink href={button.href} newTab={button.newTab} className="!px-[30px] !py-[12px]">
                {button.label}
              </ButtonLink>
            </div>
          ) : (
            // Keeps the logo centred between the menu button and the edge on small screens.
            <div aria-hidden="true" className="lg:hidden" />
          )}
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} items={items} logo={drawerLogo} />
    </>
  );
}
