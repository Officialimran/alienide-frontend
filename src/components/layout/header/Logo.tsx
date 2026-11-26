import Image from "next/image";
import Link from "next/link";
import { CmsImage } from "@/components/ui/CmsImage";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

interface LogoProps {
  /** Logo uploaded in the CMS (Site options → header / footer logo). */
  src?: string;
  /** Bundled artwork used when no logo is uploaded. */
  variant?: "white" | "dark" | "light";
  className?: string;
  priority?: boolean;
}

const fallbacks = {
  white: "/images/logo-white.svg",
  dark: "/images/logo.svg",
  light: "/images/logo_light.svg",
};

export function Logo({ src, variant = "white", className, priority }: LogoProps) {
  return (
    <Link href="/" className={cn("inline-flex shrink-0", className)} aria-label={`${siteConfig.name} home`}>
      {src ? (
        <CmsImage
          src={src}
          alt={siteConfig.name}
          width={188}
          height={40}
          priority={priority}
          className="h-10 w-[188px] object-contain object-left"
        />
      ) : (
        <Image src={fallbacks[variant]} alt={siteConfig.name} width={188} height={40} priority={priority} />
      )}
    </Link>
  );
}
