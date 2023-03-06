import { FirestoreProviderWrapper } from "@/store/providers/FirestoreProvider";
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
      <FirestoreProviderWrapper>
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
      </FirestoreProviderWrapper>
    </FirebaseAppProvider>
  );
};
export default App;
