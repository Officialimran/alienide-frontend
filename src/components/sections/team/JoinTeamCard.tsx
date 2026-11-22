import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

/** "Join our team" call-out that fills the empty last cell of the roster grid. */
export function JoinTeamCard({ href = "#" }: { href?: string }) {
  return (
    <div className="flex h-full items-center justify-center pt-[15px] pl-[30px] md:pt-0 md:pl-[56px] xl:pl-[36px]">
      <Link href={href} className="group flex flex-col items-center text-center text-primary">
        <Icon name="group" className="text-[64px] transition-transform duration-300 group-hover:-translate-y-1" />
        <span className="font-anton text-[24px] leading-[1.4167] uppercase transition-colors duration-300 group-hover:text-accent">
          join our team
        </span>
      </Link>
    </div>
  );
}
