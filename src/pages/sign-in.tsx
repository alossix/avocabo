import { SignInForm } from "@/components/Forms/SignInForm";
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

  return (
    <div style={{ width: "100%" }}>
      <h1>{t("common:sign_in")}</h1>
      <SignInForm />
    </div>
  );
};

export default SignInPage;
