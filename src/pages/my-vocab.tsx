import { MyVocabPageView } from "@/components/PageViews/MyVocabPageView";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import useFetchVocabAndAuthChanges from "@/hooks/useFetchVocabAndAuthChanges";
import { useAppSelector } from "@/store/hooks";
import { vocabSelector } from "@/store/slices/vocabSlice";

const MyVocabPage: React.FC = () => {
  const vocabList = useAppSelector(vocabSelector);

  const { loading } = useAuthRedirect({
    redirectTo: "/sign-in",
    authRequired: true,
  });

  useFetchVocabAndAuthChanges();

  return loading ? null : <MyVocabPageView vocabList={vocabList} />;
};

export default MyVocabPage;
