const nextTranslate = require("next-translate-plugin");

/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    emotion: true,
  },
};

module.exports = nextConfig;
module.exports = nextTranslate();
