import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for Vercel deployment
  output: 'export',
  trailingSlash: true,

  // Optimize images for static export
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
      {
        protocol: 'https',
        hostname: 'vectorseek.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.worldvectorlogo.com',
      },
      {
        protocol: 'https',
        hostname: 'mantra.care',
      },
      {
        protocol: 'https',
        hostname: 'www.logosarchive.com',
      },
      {
        protocol: 'https',
        hostname: 'assets-global.website-files.com',
      },
    ],
  },

  // Base path for deployment (if needed)
  // basePath: '/market-analysis',
};

export default nextConfig;