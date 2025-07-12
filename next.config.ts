import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["amqplib"],

  /* config options here */
  output: "standalone",
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
