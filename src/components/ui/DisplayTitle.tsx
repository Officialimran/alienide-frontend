import { cn } from "@/lib/cn";

interface DisplayTitleProps {
  /** Solid first part. */
  solid: string;
  /** Outlined second part. */
  outline: string;
  /** Put the outlined word on its own line. */
  stacked?: boolean;
  tone?: "dark" | "light";
  className?: string;
  as?: "h1" | "h2" | "h3";
}

/** Big Anton heading with a solid word and an outlined word ("OUR / GAMES"). */
export function DisplayTitle({
  solid,
  outline,
  stacked = true,
  tone = "dark",
  className,
  as: Tag = "h2",
}: DisplayTitleProps) {
  const color = tone === "light" ? "text-white" : "text-accent";

  return (
    <Tag className={cn("display-title m-0", color, className)}>
      <span>{solid}</span>
      {stacked ? <br /> : " "}
      <span className={cn("text-outline", tone === "light" ? "[--stroke-color:#fff]" : "[--stroke-color:#000]")}>
        {outline}
      </span>
    </Tag>
  );
}
