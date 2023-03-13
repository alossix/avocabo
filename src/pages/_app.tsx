import { store } from "@/store/store";
import "@/styles/globals.css";
import Layout from "@/styles/Layout";
import useTranslation from "next-translate/useTranslation";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";

const App = ({ Component, pageProps }: AppProps) => {
  const { t } = useTranslation("common");
  return (
    <Provider store={store}>
      <Head>
        <title>{t("common:title_tag")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
};
export default App;
