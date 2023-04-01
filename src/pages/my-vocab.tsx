import { MyVocabPageView } from "@/components/PageViews/MyVocabPageView";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { useAppSelector } from "@/store/hooks";

const MyVocabPage: React.FC = () => {
  const vocabFromState = useAppSelector((state) => state.vocab);

  const { loading } = useAuthRedirect({
    redirectTo: "/sign-in",
    authRequired: true,
  });

  return loading ? null : <MyVocabPageView vocabList={vocabFromState} />;
};

export default MyVocabPage;
