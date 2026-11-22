import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

interface TextMarqueeProps {
  items: string[];
  href?: string;
  label: string;
  /** Font-size classes for the words. */
  titleClassName?: string;
  className?: string;
}

/** Endless strip of big uppercase words separated by the spinning "indie games studio" badge. */
export function TextMarquee({
  items,
  href = "#",
  label,
  titleClassName = "text-[42px] md:text-[60px] lg:text-[80px]",
  className,
}: TextMarqueeProps) {
  // Each group animates by its own width, so two+ copies make a seamless loop.
  const groups = [0, 1, 2];

  return (
    <Reveal className={cn("group/marquee flex overflow-hidden [--marquee-duration:40s]", className)} aria-label={label}>
      {groups.map((g) => (
        <ul
          key={g}
          aria-hidden={g > 0}
          className="m-0 flex shrink-0 animate-marquee list-none items-center p-0 group-hover/marquee:[animation-play-state:paused] motion-safe-only"
        >
          {items.map((item, i) => (
            <li key={`${item}-${i}`} className="mx-[25px] flex shrink-0 items-center gap-[50px]">
              <Image
                src="/images/h1_deco.png"
                alt=""
                width={98}
                height={100}
                className="w-[98px] animate-spin-slow motion-safe-only"
              />
              <Link
                href={href}
                tabIndex={g > 0 ? -1 : undefined}
                className={cn(
                  "font-anton leading-none whitespace-nowrap text-accent uppercase transition-colors duration-300 hover:text-primary",
                  titleClassName,
                )}
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
      ))}
    </Reveal>
  );
}
