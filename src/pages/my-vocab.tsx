import { MyVocabPageView } from "@/components/PageViews/MyVocabPageView";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import useFetchVocabAndAuthChanges from "@/hooks/useFetchVocabAndAuthChanges";
import { useVocab } from "@/hooks/useVocab";
import { useAppSelector } from "@/store/hooks";
import { selectUserSignedIn } from "@/store/slices/authSlice";
import { useEffect, useState } from "react";

const MyVocabPage: React.FC = () => {
  const { vocabListDueToday } = useVocab();
  const [isReady, setIsReady] = useState(false);
  const currentUser = useAppSelector(selectUserSignedIn);

  console.log(vocabListDueToday);
  const { loading } = useAuthRedirect({
    redirectTo: "/sign-in",
    authRequired: true,
  });

  const { initialized } = useFetchVocabAndAuthChanges();

  useEffect(() => {
    if (initialized) {
      setIsReady(true);
    }
  }, [initialized]);

  if (loading || !isReady || !currentUser) {
    return null;
  }

  return (
    <MyVocabPageView currentUser={currentUser} vocabList={vocabListDueToday} />
  );
};

export default MyVocabPage;
