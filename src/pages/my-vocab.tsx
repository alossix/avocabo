import { VocabWindow } from "@/components/VocabWindow";
import { selectUserSignedIn } from "@/store/authSlice";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/router";
import { useEffect } from "react";

const MyVocabPage: React.FC = () => {
  const userSignedIn = useAppSelector(selectUserSignedIn);
  const router = useRouter();

  useEffect(() => {
    if (!userSignedIn) {
      router.push("/sign-in");
    }
  }, [router, userSignedIn]);

  return <VocabWindow />;
};
export default MyVocabPage;
