export default function handler(req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/xml");

  // Instructing the Vercel edge to cache the file
  res.setHeader("Cache-control", "stale-while-revalidate, s-maxage=3600");

  // Languages for localized versions
  const languages = ["ca", "de", "es", "en", "fr", "it", "nl", "uk"];

  // Your pages
  const pages = ["about", "sign-in", "sign-up", "subscribe"];

  const xmlPages = pages
    .map((page) =>
      languages
        .map(
          (lang) => `
          <url>
            <loc>https://www.avocabo.io/${lang}/${page}</loc>
            <lastmod>2023-06-19</lastmod>
            <xhtml:link 
              rel="alternate" 
              hreflang="${lang}" 
              href="https://www.avocabo.io/${lang}/${page}" 
            />
          </url>`
        )
        .join("")
    )
    .join("");

  // generate sitemap here
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
      http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" 
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
      xmlns:xhtml="http://www.w3.org/1999/xhtml">
      ${xmlPages}
</urlset>`;

  res.end(xml);
}
