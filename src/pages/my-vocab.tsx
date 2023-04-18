import { MyVocabPageView } from "@/components/PageViews/MyVocabPageView";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import useFetchVocabAndAuthChanges from "@/hooks/useFetchVocabAndAuthChanges";
import { useVocab } from "@/hooks/useVocab";
import { useEffect, useState } from "react";

const MyVocabPage: React.FC = () => {
  const { vocabListDueToday } = useVocab();

  const { loading } = useAuthRedirect({
    redirectTo: "/sign-in",
    authRequired: true,
  });

  const { initialized } = useFetchVocabAndAuthChanges();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (initialized) {
      setIsReady(true);
    }
  }, [initialized]);

  if (loading || !isReady) {
    return null;
  }

  return <MyVocabPageView vocabList={vocabListDueToday} />;
};

export default MyVocabPage;
