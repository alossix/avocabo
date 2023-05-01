import { SignUpForm } from "@/components/Forms/SignUpForm";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import useTranslation from "next-translate/useTranslation";

const SignUpPage: React.FC = () => {
  const { t } = useTranslation("common");
  const { loading } = useAuthRedirect({
    redirectTo: "/my-vocab",
    authRequired: false,
  });

  if (loading) {
    return <div>{t("common:loading")}</div>;
  }

  return (
    <div>
      <h1>{t("common:sign_up")}</h1>
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
