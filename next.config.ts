import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "imgur.com",
      },
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
      {
        protocol: "https",
        hostname: "farm1.staticflickr.com",
      },
      {
        protocol: "https",
        hostname: "https://live.staticflickr.com",
      },
    ],
  },
};

export default nextConfig;
