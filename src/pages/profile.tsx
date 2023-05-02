import { ProfilePageView } from "@/components/PageViews/ProfilePageView";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import useFetchVocabAndAuthChanges from "@/hooks/useFetchVocabAndAuthChanges";
import { useAppSelector } from "@/store/hooks";
import { selectUserSignedIn } from "@/store/slices/authSlice";
import { vocabSelector } from "@/store/slices/vocabSlice";

const ProfilePage: React.FC = () => {
  const currentUser = useAppSelector(selectUserSignedIn);
  const vocabList = useAppSelector(vocabSelector);

  const { loading } = useAuthRedirect({
    redirectTo: "/sign-in",
    authRequired: true,
  });

  useFetchVocabAndAuthChanges();

  return loading || !currentUser ? null : (
    <ProfilePageView
      currentUser={currentUser}
      vocabCount={Object.keys(vocabList).length}
    />
  );
};
export default ProfilePage;
