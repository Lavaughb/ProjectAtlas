import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // 🚀 THIS FIXES THE 404s
  // Replace 'ProjectAtlas' with your exact GitHub repository name
  basePath: '/ProjectAtlas', 
  assetPrefix: '/ProjectAtlas', // Ensures CSS and JS load correctly
};

export default nextConfig;
