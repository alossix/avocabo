import { MyVocabPageView } from "@/components/PageViews/MyVocabPageView";
import { useAuthRedirect } from "@/hooks/useAuthRedirect"; // Import the custom hook
import { useAppSelector } from "@/store/hooks";

const MyVocabPage: React.FC = () => {
  const vocab = useAppSelector((state) => state.vocab);

  const { loading } = useAuthRedirect({
    redirectTo: "/sign-in",
    authRequired: true,
  });

  return loading ? null : <MyVocabPageView vocabList={vocab} />;
};
export default MyVocabPage;
