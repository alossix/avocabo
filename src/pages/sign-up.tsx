import { SignUpForm } from "@/components/Forms/SignUpForm";
import { selectUserSignedIn } from "@/store/authSlice";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/router";

const SignUpPage: React.FC = () => {
  const userSignedIn = useAppSelector(selectUserSignedIn);
  const router = useRouter();

  if (userSignedIn) {
    router.push("/dashboard");
  }
  return <SignUpForm />;
};

export default SignUpPage;
