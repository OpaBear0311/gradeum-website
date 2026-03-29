import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.gradeum.io" }],
        destination: "https://gradeum.io/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
