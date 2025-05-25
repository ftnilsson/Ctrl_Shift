import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['i.pravatar.cc'],
    // For static export support
    unoptimized: true,
  },
  // Configure for static export
  output: 'export',
  // The trailing slash is important for static hosting on S3
  trailingSlash: true,
};

export default nextConfig;
