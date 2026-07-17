import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Enable Sass support */
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  },

  /* Image optimization */
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 768, 1024, 1280, 1536],
  },

  /* Compress responses */
  compress: true,

  /* Strict mode for development */
  reactStrictMode: true,

  /* Headers for security */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;