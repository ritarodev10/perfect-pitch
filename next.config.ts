import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.sofascore.app",
        pathname: "/api/v1/**",
      },
    ],
    // Disable optimization to avoid issues with external images
    unoptimized: true,
  },
};

export default nextConfig;
