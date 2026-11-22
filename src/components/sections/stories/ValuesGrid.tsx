import Image from "next/image";
import { values } from "@/data/stories";
import { cn } from "@/lib/cn";

/** Four company values separated by soft vertical rules (2×2 on tablet, stacked on mobile). */
export function ValuesGrid() {
  return (
    <ul className="m-0 flex list-none flex-wrap p-0 mx:flex-nowrap">
      {values.map((value, i) => (
        <li
          key={value.title}
          className={cn(
            "relative w-full px-[15px] pb-[30px] text-center md:w-1/2 mx:w-1/4 mx:pb-0 xl:px-[30px] 2xl:pr-[50px] 2xl:pl-[40px]",
            i < 2 && "md:pb-[60px] mx:pb-0",
            i > 0 &&
              "mx:before:absolute mx:before:inset-y-0 mx:before:left-0 mx:before:w-px mx:before:bg-[radial-gradient(at_center_center,#00000026_0%,#ffffff_100%)] mx:before:content-['']",
          )}
        >
          <Image
            src={value.image}
            alt=""
            width={195}
            height={195}
            className="mx-auto mb-[25px] transition-transform duration-300 hover:scale-105"
          />
          <h3 className="m-0 mb-[13px] font-anton text-[30px] leading-[1.3333] font-normal text-accent uppercase">
            {value.title}
          </h3>
          <p className="m-0">{value.description}</p>
        </li>
      ))}
    </ul>
  );
}
