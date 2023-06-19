/* eslint-disable @typescript-eslint/no-var-requires */
const sitemap = require("nextjs-sitemap-generator");
const path = require("path");

sitemap({
  baseUrl: "https://www.avocabo.io",
  pagesDirectory: path.resolve(__dirname, "../pages/"),
  targetDirectory: path.resolve(__dirname, "../../public/"),
  ignoredExtensions: ["js", "map", "json", "xml", "png", "jpg", "jpeg", "svg"],
  ignoredPaths: ["[fallback]"],
  allowFileExtensions: true,
});
