import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.sofascore.app",
      },
      // Allow images from localhost (for development)
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
      },
      // Allow images from Vercel deployments
      {
        protocol: "https",
        hostname: "**.vercel.app",
      },
    ],
    unoptimized: false,
  },
};

export default nextConfig;
