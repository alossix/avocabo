import { SignUpForm } from "@/components/Forms/SignUpForm";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const SignUpPage: React.FC = () => {
  const { loading } = useAuthRedirect({
    redirectTo: "/my-vocab",
    authRequired: false,
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return <SignUpForm />;
};

export default SignUpPage;
