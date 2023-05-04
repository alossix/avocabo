import { MyVocabPageView } from "@/components/PageViews/MyVocabPageView";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import useFetchVocabAndAuthChanges from "@/hooks/useFetchVocabAndAuthChanges";
import { useVocab } from "@/hooks/useVocab";
import { useAppSelector } from "@/store/hooks";
import { selectUserSignedIn } from "@/store/slices/authSlice";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";

const MyVocabPage: React.FC = () => {
  const { lang } = useTranslation();
  const { vocabListDueToday } = useVocab();
  const [isReady, setIsReady] = useState(false);
  const currentUser = useAppSelector(selectUserSignedIn);

  const { loading } = useAuthRedirect({
    redirectTo: `${lang}/sign-in`,
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
