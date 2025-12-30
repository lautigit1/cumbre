/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Next 15 requiere objeto para serverActions
    serverActions: {},
  },
  // Optimizaciones para evitar problemas de hydration
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;
