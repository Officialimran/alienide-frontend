import { cn } from "@/lib/cn";

interface RichTextProps {
  html: string | null | undefined;
  className?: string;
  as?: "div" | "section" | "article";
}

/**
 * HTML written in the CMS rich-text editor (page / project / service content,
 * widget descriptions). Content is authored by trusted admins only.
 */
export function RichText({ html, className, as: Tag = "div" }: RichTextProps) {
  if (!html?.trim()) return null;
  return <Tag className={cn("rich-text", className)} dangerouslySetInnerHTML={{ __html: html }} />;
}
