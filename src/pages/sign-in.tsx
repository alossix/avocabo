import { SignInForm } from "@/components/Forms/SignInForm";
import { selectUserSignedIn } from "@/store/authSlice";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/router";

const SignInPage: React.FC = () => {
  const userSignedIn = useAppSelector(selectUserSignedIn);
  const router = useRouter();

  if (userSignedIn) {
    router.push("/dashboard");
  }

  return <SignInForm />;
};
export default SignInPage;
