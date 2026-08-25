import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Silence Turbopack warning (we don't need custom webpack config)
  turbopack: {},
  // Cache model files
  async headers() {
    return [
      {
        source: "/models/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
