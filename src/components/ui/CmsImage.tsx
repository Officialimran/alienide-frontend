import Image, { type ImageProps } from "next/image";
import { isOptimizable } from "@/lib/media";

/**
 * next/image for CMS media. Images on the backend's /storage are optimised;
 * any other host an editor pasted (widget image URLs, YouTube thumbnails)
 * is served as-is instead of failing the remotePatterns check.
 */
export function CmsImage({ src, unoptimized, alt, ...props }: ImageProps & { src: string }) {
  return <Image src={src} alt={alt} unoptimized={unoptimized ?? !isOptimizable(src)} {...props} />;
}
