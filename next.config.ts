import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    // Allow edge store public files (and variants) to be used with next/image
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.edgestore.dev",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
