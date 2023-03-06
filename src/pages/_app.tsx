import { FirebaseProviders } from "@/store/providers/FirebaseProviders";
import { store } from "@/store/store";
import "@/styles/globals.css";
import Layout from "@/styles/Layout";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { FirebaseAppProvider } from "reactfire";
import firebaseConfig from "~/firebaseConfig";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <FirebaseProviders>
        <Provider store={store}>
          <Head>
            <title>Vocab Web</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </FirebaseProviders>
    </FirebaseAppProvider>
  );
};
export default App;
