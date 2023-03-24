import { ProfilePageView } from "@/components/PageViews/ProfilePageView";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import useFetchVocabAndAuthChanges from "@/hooks/useFetchVocabAndAuthChanges";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const ProfilePage: React.FC = () => {
  const vocabFromState = useAppSelector((state) => state.vocab);
  const currentUser = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const { loading } = useAuthRedirect({
    redirectTo: "/sign-in",
    authRequired: true,
  });

  useFetchVocabAndAuthChanges(dispatch, currentUser);

  return loading ? null : <ProfilePageView vocabList={vocabFromState} />;
};
export default ProfilePage;
