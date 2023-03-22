import { auth, getIdToken } from "@/services/firebase/firebaseService";
import { initializeAuth } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store/store";
import WithAuth from "@/store/_withAuth";
import "@/styles/globals.css";
import Layout from "@/styles/Layout";
import Cookies from "js-cookie";
import useTranslation from "next-translate/useTranslation";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  const { t } = useTranslation("common");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const WrappedComponent = WithAuth(Component);
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
    if (typeof window !== "undefined") {
      localStorage.setItem("interfaceLanguage", router.locale || "en");
    }
  }, [router.locale]);

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
      // Dispatch the auth state to Redux store here
      dispatch(initializeAuth({ user }));
    });

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.events, user]);

  return (
    <>
      <Head>
        <title>{t("common:title_tag")}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Layout>
        <WrappedComponent {...pageProps} />
      </Layout>
    </>
  );
};

export default WithAuth(App);
