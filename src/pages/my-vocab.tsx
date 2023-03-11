import { MyVocabPageView } from "@/components/PageViews/MyVocabPageView";
import { useAppSelector } from "@/store/hooks";
import { selectUserSignedIn } from "@/store/slices/authSlice";
import { useRouter } from "next/router";

const MyVocabPage: React.FC = () => {
  const currentUser = useAppSelector(selectUserSignedIn);
  const router = useRouter();

  if (!currentUser) {
    router.push("/sign-in");
  }

  return currentUser ? <MyVocabPageView currentUser={currentUser} /> : null;
};
export default MyVocabPage;
