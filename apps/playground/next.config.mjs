/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Required so Next.js compiles the workspace TS packages we consume.
  transpilePackages: ["@wds/tokens", "@wds/ui"],
};

export default nextConfig;
