import { MyVocabPageView } from "@/components/PageViews/MyVocabPageView";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import useFetchVocabAndAuthChanges from "@/hooks/useFetchVocabAndAuthChanges";
import { useVocab } from "@/hooks/useVocab";

const MyVocabPage: React.FC = () => {
  const { vocabListDueToday } = useVocab();

  const { loading } = useAuthRedirect({
    redirectTo: "/sign-in",
    authRequired: true,
  });

  useFetchVocabAndAuthChanges();

  return loading ? null : <MyVocabPageView vocabList={vocabListDueToday} />;
};

export default MyVocabPage;
