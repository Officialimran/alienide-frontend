import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

type Variant = "primary" | "white" | "link";

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

const variants: Record<Variant, string> = {
  primary: "btn",
  white: "btn btn-white",
  link: "btn-link",
};

/** Theme button: label + rotating ↗ arrow. */
export function ButtonLink({ href, children, variant = "primary", className }: ButtonLinkProps) {
  return (
    <Link href={href} className={cn(variants[variant], className)}>
      <span>{children}</span>
      <Icon name="arrow-top-right" />
    </Link>
  );
}
