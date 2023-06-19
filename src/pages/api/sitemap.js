export default function handler(req, res) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/xml");

  // Instructing the Vercel edge to cache the file
  res.setHeader("Cache-control", "stale-while-revalidate, s-maxage=3600");

  // generate sitemap here
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
      http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" 
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
      xmlns:xhtml="http://www.w3.org/1999/xhtml">
      
	<url>
		<loc>https://www.avocabo.io/about.tsx</loc>
		<lastmod>2023-06-19</lastmod>
	</url>

	<url>
		<loc>https://www.avocabo.io/add-words.tsx</loc>
		<lastmod>2023-06-19</lastmod>
	</url>

	<url>
		<loc>https://www.avocabo.io/index.tsx</loc>
		<lastmod>2023-06-19</lastmod>
	</url>

	<url>
		<loc>https://www.avocabo.io/my-vocab.tsx</loc>
		<lastmod>2023-06-19</lastmod>
	</url>

	<url>
		<loc>https://www.avocabo.io/profile.tsx</loc>
		<lastmod>2023-06-19</lastmod>
	</url>

	<url>
		<loc>https://www.avocabo.io/sign-in.tsx</loc>
		<lastmod>2023-06-19</lastmod>
	</url>

	<url>
		<loc>https://www.avocabo.io/sign-up.tsx</loc>
		<lastmod>2023-06-19</lastmod>
	</url>

	<url>
		<loc>https://www.avocabo.io/subscribe.tsx</loc>
		<lastmod>2023-06-19</lastmod>
	</url>
</urlset>`;

  res.end(xml);
}
