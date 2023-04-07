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
    domains: [
      "thumbnails.production.thenounproject.com",
      "firebasestorage.googleapis.com",
    ],
  },
};

module.exports = nextConfig;
