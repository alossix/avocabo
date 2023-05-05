import { SignUpPageView } from "@/components/PageViews/SignUpPageView";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import useTranslation from "next-translate/useTranslation";

const SignUpPage: React.FC = () => {
  const { lang, t } = useTranslation("common");
  const { loading } = useAuthRedirect({
    redirectTo: `/${lang}/my-vocab`,
    authRequired: false,
  });

  if (loading) {
    return <div>{t("common:loading")}</div>;
  }

  return <SignUpPageView />;
};

export default SignUpPage;
