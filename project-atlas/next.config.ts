import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // This must match your repo name exactly (case-sensitive)
  basePath: '/ProjectAtlas', 
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
