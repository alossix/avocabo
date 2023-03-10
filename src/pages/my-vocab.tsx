import { MyVocabPageView } from "@/components/PageViews/MyVocabPageView";
import { selectUserSignedIn } from "@/store/slices/authSlice";
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

  return <MyVocabPageView />;
};
export default MyVocabPage;
