import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  cacheComponents: true,
  cacheLife: {
    minutes: {
      revalidate: 30,
    },
  },
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "covers.openlibrary.org",
        pathname: "/b/**",
      },
    ],
  },
}

export default nextConfig
