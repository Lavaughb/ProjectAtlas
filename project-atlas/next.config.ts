import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // We are REMOVING basePath here because we will handle it manually in the code
};

export default nextConfig;
