import { MyVocabPageView } from "@/components/PageViews/MyVocabPageView";
import { useAppSelector } from "@/store/hooks";
import { selectUserSignedIn } from "@/store/slices/authSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";

const MyVocabPage: React.FC = () => {
  const vocab = useAppSelector((state) => state.vocab);
  const currentUser = useAppSelector(selectUserSignedIn);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push("/sign-in");
    }
  }, [router, currentUser]);

  return currentUser ? <MyVocabPageView vocabList={vocab} /> : null;
};
export default MyVocabPage;
