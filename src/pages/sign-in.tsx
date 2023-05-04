import { SignInPageView } from "@/components/PageViews/SignInPageView";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import useTranslation from "next-translate/useTranslation";

const SignInPage: React.FC = () => {
  const { lang, t } = useTranslation("common");
  const { loading } = useAuthRedirect({
    redirectTo: `/${lang}/my-vocab`,
    authRequired: false,
  });

  if (loading) {
    return <div>{t("common:loading")}</div>;
  }

  return <SignInPageView />;
};

export default SignInPage;
