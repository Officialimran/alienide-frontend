import type { NextConfig } from "next";
import type { RemotePattern } from "next/dist/shared/lib/image-config";

const apiUrl = new URL(process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000/api/v1");

/** Images uploaded in the CMS are served from the backend's /storage folder. */
const backendImages: RemotePattern = {
  protocol: apiUrl.protocol.replace(":", "") as "http" | "https",
  hostname: apiUrl.hostname,
  port: apiUrl.port,
  pathname: "/storage/**",
};

const isLocalBackend = ["127.0.0.1", "localhost", "::1"].includes(apiUrl.hostname);

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // AVIF first (typically ~20–50% smaller than WebP at the same quality), WebP as the fallback.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [backendImages],
    // The optimizer refuses private IPs by default; allow them only for a local backend.
    dangerouslyAllowLocalIP: isLocalBackend,
  },
};

export default nextConfig;
