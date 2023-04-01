import { ProfilePageView } from "@/components/PageViews/ProfilePageView";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { useAppSelector } from "@/store/hooks";

const ProfilePage: React.FC = () => {
  const vocabFromState = useAppSelector((state) => state.vocab);

  const { loading } = useAuthRedirect({
    redirectTo: "/sign-in",
    authRequired: true,
  });

  return loading ? null : <ProfilePageView vocabList={vocabFromState} />;
};
export default ProfilePage;
