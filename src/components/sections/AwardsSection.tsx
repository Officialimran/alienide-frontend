import Image from "next/image";
import { DisplayTitle } from "@/components/ui/DisplayTitle";
import { MotionFx, type MotionFxProps } from "@/components/ui/MotionFx";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

/**
 * STATIC CONTENT — the backend has no awards module or widget yet.
 * Captions are taken from the trophy artwork itself.
 */
interface Trophy {
  src: string;
  /** Intrinsic size of the file. */
  width: number;
  height: number;
  /** Visible artwork inside the file (x, y, w, h), so padded PNGs line up like trimmed ones. */
  crop: [number, number, number, number];
  medal: string;
  category: string;
  year: string;
}

const AWARD_NAME = "Digital Marketing Award";

/** The featured (large) trophy first, the companion trophy second. */
const [featured, companion]: Trophy[] = [
  {
    src: "/images/award.png",
    width: 1200,
    height: 1208,
    crop: [157, 211, 837, 866],
    medal: "Silver",
    category: "Best digital experience marketing",
    year: "2023",
  },
  {
    src: "/images/award-v2.png",
    width: 250,
    height: 250,
    crop: [5, 2, 241, 248],
    medal: "Bronze",
    category: "Best use of mobile",
    year: "2024",
  },
];

const pct = (part: number, whole: number) => `${((part / whole) * 100).toFixed(3)}%`;

/** Shows only the visible part of a trophy PNG, at the box's width. */
function TrophyImage({ trophy, sizes }: { trophy: Trophy; sizes: string }) {
  const [x, y, w, h] = trophy.crop;
  return (
    <span className="relative block w-full overflow-hidden" style={{ aspectRatio: `${w} / ${h}` }}>
      <Image
        src={trophy.src}
        alt={`${AWARD_NAME} ${trophy.year}: ${trophy.medal}, ${trophy.category}`}
        width={trophy.width}
        height={trophy.height}
        sizes={sizes}
        className="absolute max-w-none"
        style={{ width: pct(trophy.width, w), left: `-${pct(x, w)}`, top: `-${pct(y, h)}` }}
      />
    </span>
  );
}

/** Trophy with a soft halo behind it and a contact shadow under its base. */
function TrophyFigure({
  trophy,
  sizes,
  motion,
  className,
}: {
  trophy: Trophy;
  sizes: string;
  motion: Pick<MotionFxProps, "scrollX" | "mouseTrack" | "tilt" | "minWidth">;
  className?: string;
}) {
  return (
    <figure className={cn("group/trophy relative m-0 shrink-0", className)}>
      {/* Halo */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[8%] rounded-full bg-white/60 blur-[40px] transition-opacity duration-500 will-change-[opacity] group-hover/trophy:opacity-100 md:opacity-70"
      />
      <MotionFx {...motion} className="relative">
        <span className="block transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/trophy:-translate-y-[8px] group-hover/trophy:rotate-[-2deg]">
          <TrophyImage trophy={trophy} sizes={sizes} />
        </span>
      </MotionFx>
      {/* Contact shadow */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[10px] left-1/2 h-[18px] w-[70%] -translate-x-1/2 rounded-[50%] bg-black/25 blur-[8px] transition-all duration-500 group-hover/trophy:w-[60%] group-hover/trophy:bg-black/15"
      />
    </figure>
  );
}

function MedalChip({ trophy }: { trophy: Trophy }) {
  return (
    <li className="flex max-w-full items-center gap-[10px] rounded-[22px] bg-black py-[6px] pr-[16px] pl-[6px] text-left text-white">
      <span className="flex h-[30px] min-w-[52px] shrink-0 items-center justify-center rounded-full bg-primary px-[10px] font-anton text-[14px] leading-none text-black">
        {trophy.year}
      </span>
      <span className="min-w-0 font-unbounded text-[12px] leading-[1.3] font-medium">
        {trophy.medal}
        {/* Category on stacked layouts; on desktop the trophy beside it shows it. */}
        <span className="text-white/55 lg:hidden"> · {trophy.category}</span>
      </span>
    </li>
  );
}

export function AwardsSection() {
  return (
    <section
      aria-label="Our awards"
      className="relative z-10 overlap-section overflow-hidden rounded-section bg-dark pt-[60px] pb-[90px] md:pt-[80px] md:pb-[120px] lg:pt-[150px] lg:pb-[240px]"
    >
      {/* Ambient glow in the brand colour behind the banner */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-[55%] left-1/2 h-[420px] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[120px]"
      />

      <div className="site-container relative">
        <Reveal className="mb-[110px] text-center md:mb-[150px] xl:mb-[190px]">
          <DisplayTitle solid="Our" outline="awards" tone="light" stacked={false} />
        </Reveal>

        <Reveal className="relative isolate rounded-[30px] bg-primary md:rounded-[50px] lg:rounded-[80px]">
          {/* Surface: light sheen top-left, deeper tone bottom-right, faint dot grid */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-[radial-gradient(120%_140%_at_0%_0%,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0)_45%),linear-gradient(135deg,#2df4a1_0%,#22d98c_100%)]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] bg-[radial-gradient(rgba(0,0,0,0.09)_1px,transparent_1.5px)] [background-size:18px_18px] [mask-image:linear-gradient(90deg,transparent,black_35%,black_65%,transparent)]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_30px_80px_-20px_rgba(45,244,161,0.45)]"
          />

          <div className="flex flex-col items-center px-[20px] pb-[40px] text-center md:px-[40px] lg:flex-row lg:items-end lg:px-[50px] lg:pb-0 lg:text-left xl:px-[80px]">
            {/*
              Featured trophy, breaking out of the top edge. From desktop up it stands on the
              banner floor (absolute), so the banner's height comes from the copy and the
              trophy always rises above it, whatever the text length.
            */}
            <div className="relative -mt-[90px] w-[210px] shrink-0 md:-mt-[110px] md:w-[250px] lg:mt-0 lg:w-[300px] lg:self-stretch xl:w-[340px]">
              <TrophyFigure
                trophy={featured}
                sizes="(min-width: 1201px) 340px, (min-width: 1025px) 300px, (min-width: 768px) 250px, 210px"
                motion={{ scrollX: { speed: 0.6 }, minWidth: 1025 }}
                className="w-full lg:absolute lg:inset-x-0 lg:bottom-[30px]"
              />
            </div>

            {/* Copy */}
            <div className="flex flex-1 flex-col items-center pt-[30px] lg:items-start lg:self-center lg:px-[50px] lg:py-[48px] xl:px-[60px]">
              <p className="m-0 mb-[12px] inline-flex items-center gap-[10px] font-unbounded text-[11px] leading-none font-medium tracking-[0.18em] text-black/65 uppercase">
                <span aria-hidden="true" className="h-[2px] w-[28px] rounded-full bg-black/40" />
                {AWARD_NAME}
              </p>
              <h3 className="m-0 mb-[22px] font-anton text-[34px] leading-[1.05] font-normal text-black uppercase md:text-[44px] lg:text-[46px] xl:text-[48px]">
                Award-winning
                <br />
                <span className="text-outline [--stroke-color:#000] [--stroke-width:1.5px]">digital experiences</span>
              </h3>
              <ul className="m-0 flex list-none flex-col items-center gap-[10px] p-0 md:flex-row md:flex-wrap md:justify-center lg:justify-start">
                <MedalChip trophy={featured} />
                <MedalChip trophy={companion} />
              </ul>
            </div>

            {/* Companion trophy beside a divider (hidden 1025–1200px, where the copy needs the room) */}
            <div className="mt-[40px] flex items-end self-stretch max-lg:justify-center max-lg:border-t max-lg:border-black/15 max-lg:pt-[40px] lg:hidden xl:mt-0 xl:flex xl:border-l xl:border-black/15 xl:pl-[60px]">
              <TrophyFigure
                trophy={companion}
                sizes="(min-width: 1201px) 180px, 150px"
                motion={{ mouseTrack: { speed: 0.3 }, tilt: { speed: 3 } }}
                className="w-[150px] xl:mb-[30px] xl:w-[180px]"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
