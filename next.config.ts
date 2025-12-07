import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.sofascore.app",
        // Remove pathname restriction to allow all paths
      },
    ],
    // Disable optimization to avoid issues with external images
    unoptimized: true,
  },
};

export default nextConfig;
