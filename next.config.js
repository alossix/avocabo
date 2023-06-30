// eslint-disable-next-line
const nextTranslate = require("next-translate-plugin");

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
  ...nextTranslate(),
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
    ];
  },
};

module.exports = nextConfig;
