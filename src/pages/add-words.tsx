import { AddWordsPageView } from "@/components/PageViews/AddWordsPageView";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";

const AddWordsPage: React.FC = () => {
  const { t } = useTranslation("common");

  const { loading } = useAuthRedirect({
    redirectTo: "/sign-in",
    authRequired: true,
  });

  return loading ? null : (
    <>
      <Head>
        <title>{t("common:header_add_words")}</title>
      </Head>
      <AddWordsPageView />
    </>
  );
};

export default AddWordsPage;
