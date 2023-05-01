import { AddWordForm } from "@/components/Forms/AddWordForm";
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
      <div style={{ width: "100%" }}>
        <h1>{t("common:header_add_words")}</h1>
        <AddWordForm />
      </div>
    </>
  );
};

export default AddWordsPage;
