import { mediaUrl } from "@/lib/media";

/** Background video for the home hero, resolved from a banner's `video_url`. */
export type HeroVideo =
  | { kind: "youtube"; id: string; start?: number; end?: number }
  | { kind: "file"; src: string };

const YT_HOSTS = /(^|\.)(youtube\.com|youtube-nocookie\.com|youtu\.be)$/i;
const YT_ID = /^[\w-]{11}$/;
const VIDEO_FILE = /\.(mp4|webm|ogv|ogg|mov|m4v)(\?|#|$)/i;

/** "90", "90s", "1m30s", "1h2m3s" → seconds. */
function parseSeconds(value: string | null): number | undefined {
  if (!value) return undefined;
  if (/^\d+(\.\d+)?$/.test(value)) return Number(value);
  const m = value.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/i);
  if (!m || !m[0]) return undefined;
  return Number(m[1] ?? 0) * 3600 + Number(m[2] ?? 0) * 60 + Number(m[3] ?? 0);
}

function youTubeId(url: URL): string | undefined {
  if (/youtu\.be$/i.test(url.hostname)) return url.pathname.split("/")[1];
  const v = url.searchParams.get("v");
  if (v) return v;
  // /embed/ID, /shorts/ID, /live/ID, /v/ID
  const m = url.pathname.match(/^\/(?:embed|shorts|live|v)\/([^/?#]+)/);
  return m?.[1];
}

/**
 * Turns the CMS banner `video_url` into something the hero can play:
 * a YouTube link (watch, youtu.be, embed, shorts — `t`/`start` and `end`
 * query params set the loop segment) or a direct video file.
 */
export function heroVideoFromUrl(raw: string | null | undefined): HeroVideo | undefined {
  const value = raw?.trim();
  if (!value) return undefined;

  let url: URL | undefined;
  try {
    url = new URL(value);
  } catch {
    url = undefined;
  }

  if (url && YT_HOSTS.test(url.hostname)) {
    const id = youTubeId(url);
    if (!id || !YT_ID.test(id)) return undefined;
    const start = parseSeconds(url.searchParams.get("start") ?? url.searchParams.get("t"));
    const end = parseSeconds(url.searchParams.get("end"));
    return { kind: "youtube", id, start, end: end !== undefined && end > (start ?? 0) ? end : undefined };
  }

  if (VIDEO_FILE.test(value)) {
    const src = mediaUrl(value);
    return src ? { kind: "file", src } : undefined;
  }

  return undefined;
}
