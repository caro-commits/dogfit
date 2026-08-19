import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/tarifs",
        destination: "/cours#formules",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
