import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/cn";

interface LogoProps {
  variant?: "white" | "dark" | "light";
  className?: string;
  priority?: boolean;
}

const sources = {
  white: "/images/logo-white.svg",
  dark: "/images/logo.svg",
  light: "/images/logo_light.svg",
};

export function Logo({ variant = "white", className, priority }: LogoProps) {
  return (
    <Link href="/" className={cn("inline-flex shrink-0", className)} aria-label={`${siteConfig.name} home`}>
      <Image src={sources[variant]} alt={siteConfig.name} width={188} height={40} priority={priority} />
    </Link>
  );
}
