import { Html, Head, Main, NextScript } from "next/document";

const Document = () => (
  <Html lang="en">
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <meta charSet="UTF-8" />
      <meta
        name="description"
        content="Avocabo is a spaced-repetition card system used to help people learn vocabulary faster."
      />
      <meta
        name="keywords"
        content="vocabulary, learning, spaced-repetition, flashcards, education"
      />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Avocabo" />
      <meta property="og:title" content="Avocabo" />
      <meta property="og:type" content="website" />
      <meta
        property="og:description"
        content="Avocabo is a spaced-repetition card system to help you learn vocabulary faster."
      />
      <meta property="og:url" content="https://www.avocabo.io" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
