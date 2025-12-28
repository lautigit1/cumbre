/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Next 15 requiere objeto para serverActions
    serverActions: {},
  },
};

module.exports = nextConfig;
