import { auth, getIdToken } from "@/services/firebase/firebaseService";
import { store } from "@/store/store";
import "@/styles/globals.css";
import Layout from "@/styles/Layout";
import useTranslation from "next-translate/useTranslation";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Provider } from "react-redux";
import Cookies from "js-cookie";

const App = ({ Component, pageProps }: AppProps) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [user] = useAuthState(auth);

  const handleRouteChange = async () => {
    if (user) {
      const token = await getIdToken(user);
      if (token) {
        Cookies.set("userId", user.uid, {
          path: "/",
          sameSite: "None",
          secure: true,
        });
        Cookies.set("idToken", token, {
          path: "/",
          sameSite: "None",
          secure: true,
        });
      } else {
        Cookies.remove("userId", { sameSite: "lax" });
        Cookies.remove("idToken", { sameSite: "lax" });
      }
    } else {
      Cookies.remove("userId", { sameSite: "lax" });
      Cookies.remove("idToken", { sameSite: "lax" });
    }
  };

  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange);

    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await getIdToken(user);
        if (token) {
          Cookies.set("userId", user.uid, {
            path: "/",
            sameSite: "None",
            secure: true,
          });
          Cookies.set("idToken", token, {
            path: "/",
            sameSite: "None",
            secure: true,
          });
        }
      } else {
        Cookies.remove("userId");
        Cookies.remove("idToken");
      }
    });

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.events, user]);

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
