import { AddWordsPageView } from "@/components/PageViews/AddWordsPageView";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { useAppSelector } from "@/store/hooks";
import { selectUserSignedIn } from "@/store/slices/authSlice";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";

const AddWordsPage: React.FC = () => {
  const { t } = useTranslation("common");
  const currentUser = useAppSelector(selectUserSignedIn);

  const { loading } = useAuthRedirect({
    redirectTo: "/sign-in",
    authRequired: true,
  });

  if (loading || !currentUser) return null;

  return (
    <>
      <Head>
        <title>{t("common:header_add_words")}</title>
      </Head>
      <AddWordsPageView currentUser={currentUser} />
    </>
  );
};

export default AddWordsPage;
