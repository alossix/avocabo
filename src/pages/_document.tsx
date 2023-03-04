import { Html, Head, Main, NextScript } from "next/document";

const Document = () => (
  <Html lang="en">
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <meta charSet="UTF-8" />
      <meta
        name="description"
        content="Vocab-Web is a spaced-repetition card system used to help people learn vocabulary faster."
      />
      <meta
        name="keywords"
        content="vocabulary, learning, spaced-repetition, flashcards, education"
      />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Rich Alossi" />
      <meta property="og:title" content="Vocab-Web" />
      <meta
        property="og:description"
        content="Vocab-Web is a spaced-repetition card system to help you learn vocabulary faster."
      />
      <meta property="og:url" content="https://www.example.com/vocab-web" />
      <script type="application/ld+json">
        {`{
        "@context": "https://schema.org/",
        "@type": "WebSite",
        "name": "Vocab-Web",
        "description": "Vocab-Web is a spaced-repetition card system to help you learn vocabulary faster.",
        "url": "https://www.example.com/vocab-web",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://www.example.com/vocab-web/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }`}
      </script>
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;