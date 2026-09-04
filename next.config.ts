import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // is folder ko hi project ki root maano
  // (warna Next OneDrive ke bahar wali package-lock.json dhoondta hai)
  turbopack: { root: __dirname },
};

export default nextConfig;
