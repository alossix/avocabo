import { MyVocabPageView } from "@/components/PageViews/MyVocabPageView";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/router";
import { useEffect } from "react";

const MyVocabPage: React.FC = () => {
  const appState = useAppSelector((state) => state);
  const router = useRouter();

  useEffect(() => {
    if (!appState.auth.user) {
      router.push("/sign-in");
    }
  }, [router, appState.auth]);

  return appState.auth.user ? (
    <MyVocabPageView vocabList={appState.vocab} />
  ) : null;
};
export default MyVocabPage;
