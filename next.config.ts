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
}

export default nextConfig