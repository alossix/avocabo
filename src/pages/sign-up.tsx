import { SignUpForm } from "@/components/Forms/SignUpForm";
import { selectUserSignedIn } from "@/store/slices/authSlice";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/router";

const SignUpPage: React.FC = () => {
  const currentUser = useAppSelector(selectUserSignedIn);
  const router = useRouter();

  if (currentUser) {
    router.push("/dashboard");
  }
  return <SignUpForm />;
};

export default SignUpPage;
