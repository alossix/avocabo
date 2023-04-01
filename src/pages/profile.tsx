import { ProfilePageView } from "@/components/PageViews/ProfilePageView";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import useFetchVocabAndAuthChanges from "@/hooks/useFetchVocabAndAuthChanges";
import { useAppSelector } from "@/store/hooks";
import { vocabSelector } from "@/store/slices/vocabSlice";

const ProfilePage: React.FC = () => {
  const vocabList = useAppSelector(vocabSelector);

  const { loading } = useAuthRedirect({
    redirectTo: "/sign-in",
    authRequired: true,
  });

  useFetchVocabAndAuthChanges();

  return loading ? null : <ProfilePageView vocabList={vocabList} />;
};
export default ProfilePage;
