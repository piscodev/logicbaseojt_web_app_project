import type { NextConfig } from "next";

const nextConfig: NextConfig =
{
  images:
  {
    remotePatterns: [
      {
          protocol: "https",
          hostname:"files.edgestore.dev"
      },
      {
          protocol: "https",
          hostname:"lh3.googleusercontent.com"
      },
      {
          protocol: "https",
          hostname:"tailwindui.com"
      },
    ],
  },
  env: {
    TZ: 'Asia/Manila',
  },
}

export default nextConfig