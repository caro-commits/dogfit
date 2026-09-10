import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
  async redirects() {
    return [
      {
        source: "/tarifs",
        destination: "/cours/coaching-en-ligne",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
