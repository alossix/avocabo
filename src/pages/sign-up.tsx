import { SignUpForm } from "@/components/Forms/SignUpForm";
import { selectUserSignedIn } from "@/store/slices/authSlice";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/router";
import { useEffect } from "react";

const SignUpPage: React.FC = () => {
  const currentUser = useAppSelector(selectUserSignedIn);
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push("/dashboard");
    }
  }, [router, currentUser]);
  return currentUser ? null : <SignUpForm />;
};

export default SignUpPage;
