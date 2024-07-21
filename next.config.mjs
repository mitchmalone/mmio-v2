/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  transpilePackages: ["reshaped"],
  experimental: {
    optimizePackageImports: ["reshaped"],
  },
};

export default nextConfig;
