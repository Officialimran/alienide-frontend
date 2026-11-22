"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

interface HeroVideoProps {
  videoId: string;
  start: number;
  end: number;
  poster: string;
}

interface YTPlayer {
  seekTo(seconds: number, allowSeekAhead: boolean): void;
  playVideo(): void;
  mute(): void;
  getCurrentTime(): number;
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
  PlayerState: { ENDED: number; PLAYING: number };
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

/**
 * Muted, chrome-less YouTube background that loops a fixed segment
 * (as Elementor's background video does) and is scaled to "cover"
 * its container. The poster shows until playback starts.
 */
export function HeroVideo({ videoId, start, end, poster }: HeroVideoProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [size, setSize] = useState({ width: 0, height: 0 });

  // Size the 16:9 frame so it always covers the container.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const update = () => {
      const { width, height } = wrap.getBoundingClientRect();
      const ratio = 16 / 9;
      setSize(width / height > ratio ? { width, height: width / ratio } : { width: height * ratio, height });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let player: YTPlayer | null = null;
    let timer: number | undefined;
    let cancelled = false;

    loadYouTubeApi().then((YT) => {
      if (cancelled || !mountRef.current) return;
      player = new YT.Player(mountRef.current, {
        videoId,
        playerVars: {
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
          end,
        },
        events: {
          onReady: (e) => {
            e.target.mute();
            e.target.playVideo();
          },
          onStateChange: (e) => {
            if (e.data === YT.PlayerState.PLAYING) {
              setPlaying(true);
              window.clearInterval(timer);
              timer = window.setInterval(() => {
                if (player && player.getCurrentTime() >= end - 0.15) player.seekTo(start, true);
              }, 100);
            }
            if (e.data === YT.PlayerState.ENDED) {
              e.target.seekTo(start, true);
              e.target.playVideo();
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
      window.clearInterval(timer);
      player?.destroy();
    };
  }, [videoId, start, end]);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-[-60px] bottom-[-60px] overflow-hidden bg-dark bg-cover bg-center"
      style={{ backgroundImage: `url(${poster})` }}
    >
      <div
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000",
          playing ? "opacity-100" : "opacity-0",
        )}
        style={{ width: size.width, height: size.height }}
      >
        <div ref={mountRef} className="h-full w-full [&>iframe]:h-full [&>iframe]:w-full" />
      </div>
    </div>
  );
}
