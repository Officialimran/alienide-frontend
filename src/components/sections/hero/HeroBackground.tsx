"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { observeIntersection } from "@/hooks/useInView";
import { cn } from "@/lib/cn";
import type { HeroVideo } from "@/lib/video";

/** Delay between the banner image being shown and the video starting to load. */
const VIDEO_DELAY_MS = 2000;

interface HeroBackgroundProps {
  image: string;
  imageMobile?: string;
  /** From the banner's `video_url`; the image alone is shown without one. */
  video?: HeroVideo;
}

interface YTPlayer {
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  playVideo(): void;
  mute(): void;
  getCurrentTime(): number;
  getDuration(): number;
  getPlayerState(): number;
  destroy(): void;
}

interface YTNamespace {
  Player: new (
    el: HTMLElement,
    opts: {
      videoId: string;
      playerVars: Record<string, string | number>;
      events: {
        onReady?: (e: { target: YTPlayer }) => void;
        onStateChange?: (e: { data: number; target: YTPlayer }) => void;
      };
    },
  ) => YTPlayer;
  PlayerState: { ENDED: number; PLAYING: number; PAUSED: number; CUED: number };
}

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<YTNamespace> | null = null;

function loadYouTubeApi(): Promise<YTNamespace> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      if (window.YT) resolve(window.YT);
    };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    tag.async = true;
    document.head.appendChild(tag);
  });
  return apiPromise;
}

/** Size of a 16:9 box that always covers the given element. */
function useCoverSize(ref: React.RefObject<HTMLElement | null>, active: boolean) {
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!active || !el) return;
    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      const ratio = 16 / 9;
      setSize(width / height > ratio ? { width, height: width / ratio } : { width: height * ratio, height });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref, active]);
  return size;
}

/** Muted, chrome-less YouTube player looping the whole video (or its start–end segment). */
function YouTubeLayer({ video, wrapRef, onPlaying, visible }: {
  video: Extract<HeroVideo, { kind: "youtube" }>;
  wrapRef: React.RefObject<HTMLDivElement | null>;
  onPlaying: () => void;
  /** False while the hero is scrolled out of view: the watchdog then idles. */
  visible: boolean;
}) {
  const visibleRef = useRef(visible);
  useEffect(() => {
    visibleRef.current = visible;
  }, [visible]);
  const mountRef = useRef<HTMLDivElement>(null);
  const size = useCoverSize(wrapRef, true);
  const { id, start = 0, end } = video;

  useEffect(() => {
    let player: YTPlayer | null = null;
    let ready = false;
    let watchdog: number | undefined;
    let cancelled = false;

    const restart = () => {
      player?.seekTo(start, true);
      player?.playVideo();
    };

    // Polled every 100ms: jump back to `start` just before the loop point so the
    // player never reaches ENDED (no stop, no end screen), and resume it if
    // anything — the browser, a hidden tab, a stall — left it paused.
    const tick = () => {
      if (!player || !ready || !visibleRef.current) return;
      const loopAt = end ?? player.getDuration();
      if (loopAt > 0 && player.getCurrentTime() >= loopAt - 0.3) {
        restart();
        return;
      }
      const state = player.getPlayerState();
      if (state === window.YT?.PlayerState.PAUSED || state === window.YT?.PlayerState.CUED) player.playVideo();
      if (state === window.YT?.PlayerState.ENDED) restart();
    };

    const onVisible = () => {
      if (document.visibilityState === "visible" && ready) player?.playVideo();
    };

    loadYouTubeApi().then((YT) => {
      if (cancelled || !mountRef.current) return;
      const playerVars: Record<string, string | number> = {
        autoplay: 1,
        mute: 1,
        controls: 0,
        disablekb: 1,
        fs: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        playsinline: 1,
        rel: 0,
        start,
        // Native looping as a fallback (YouTube needs `playlist` for `loop`).
        loop: 1,
        playlist: id,
      };
      if (end !== undefined) playerVars.end = end;

      player = new YT.Player(mountRef.current, {
        videoId: id,
        playerVars,
        events: {
          onReady: (e) => {
            ready = true;
            e.target.mute();
            e.target.playVideo();
            watchdog = window.setInterval(tick, 100);
          },
          onStateChange: (e) => {
            if (e.data === YT.PlayerState.PLAYING) onPlaying();
            if (e.data === YT.PlayerState.ENDED) restart();
            if (e.data === YT.PlayerState.PAUSED) e.target.playVideo();
          },
        },
      });
    });

    document.addEventListener("visibilitychange", onVisible);
    return () => {
      cancelled = true;
      window.clearInterval(watchdog);
      document.removeEventListener("visibilitychange", onVisible);
      player?.destroy();
    };
  }, [id, start, end, onPlaying]);

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ width: size.width, height: size.height }}
    >
      <div ref={mountRef} className="h-full w-full [&>iframe]:h-full [&>iframe]:w-full" />
    </div>
  );
}

/** Muted video file that loops forever and resumes itself if it is ever paused. */
function FileLayer({ src, onPlaying, visible }: { src: string; onPlaying: () => void; visible: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // While the hero is scrolled out of view the video is paused (no decoding
    // or compositing work during scrolling); it resumes before it reappears.
    if (!visible) {
      el.pause();
      return;
    }
    const resume = () => {
      if (document.visibilityState === "visible" && el.paused) el.play().catch(() => undefined);
    };
    const restart = () => {
      el.currentTime = 0;
      resume();
    };
    el.addEventListener("pause", resume);
    el.addEventListener("ended", restart);
    el.addEventListener("stalled", resume);
    document.addEventListener("visibilitychange", resume);
    resume();
    return () => {
      el.removeEventListener("pause", resume);
      el.removeEventListener("ended", restart);
      el.removeEventListener("stalled", resume);
      document.removeEventListener("visibilitychange", resume);
    };
  }, [src, visible]);

  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      onPlaying={onPlaying}
      className="h-full w-full object-cover"
    />
  );
}

/**
 * Hero background. The banner image is rendered first; once it has fully
 * loaded and been decoded (i.e. is on screen), a further 3 seconds pass
 * before the banner video is requested. The video fades in over the image
 * only when playback has actually started.
 */
export function HeroBackground({ image, imageMobile, video }: HeroBackgroundProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [imageReady, setImageReady] = useState(false);
  const [loadVideo, setLoadVideo] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [visible, setVisible] = useState(true);
  const markPlaying = useCallback(() => setPlaying(true), []);

  // Track whether the hero is on screen (with a margin so playback resumes before it is seen).
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    return observeIntersection(el, (entry) => setVisible(entry.isIntersecting), { rootMargin: "25% 0px 25% 0px" });
  }, []);

  // The image may finish before hydration, in which case onLoad never fires.
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) setImageReady(true);
  }, []);

  // Image loaded → wait until it is decoded/painted → 3s → load the video.
  useEffect(() => {
    if (!imageReady || !video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    let timer: number | undefined;
    const img = imgRef.current;
    (img?.decode ? img.decode() : Promise.resolve())
      .catch(() => undefined)
      .then(() => {
        if (!cancelled) timer = window.setTimeout(() => setLoadVideo(true), VIDEO_DELAY_MS);
      });
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [imageReady, video]);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-[-60px] bottom-[-60px] overflow-hidden bg-dark"
    >
      <picture>
        {imageMobile && <source media="(max-width: 767px)" srcSet={imageMobile} />}
        <img
          ref={imgRef}
          src={image}
          alt=""
          fetchPriority="high"
          onLoad={() => setImageReady(true)}
          className="h-full w-full object-cover"
        />
      </picture>

      {loadVideo && video && (
        <div className={cn("absolute inset-0 transition-opacity duration-1000", playing ? "opacity-100" : "opacity-0")}>
          {video.kind === "youtube" ? (
            <YouTubeLayer video={video} wrapRef={wrapRef} onPlaying={markPlaying} visible={visible} />
          ) : (
            <FileLayer src={video.src} onPlaying={markPlaying} visible={visible} />
          )}
        </div>
      )}
    </div>
  );
}
