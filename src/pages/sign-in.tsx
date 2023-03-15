import { SignInForm } from "@/components/Forms/SignInForm";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const SignInPage: React.FC = () => {
  const { loading } = useAuthRedirect({
    redirectTo: "/dashboard",
    authRequired: false,
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return <SignInForm />;
};

export default SignInPage;
