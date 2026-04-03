import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. 🚀 This tells Next.js to build the 'out' folder
  output: 'export', 

  // 2. 🖼️ GitHub Pages doesn't support the default Image Optimizer
  images: {
    unoptimized: true, 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
    ],
  },

  // 3. 🛠️ Optional: If your site is at username.github.io/project-atlas/
  // You might need to add: basePath: '/project-atlas',
};

export default nextConfig;
