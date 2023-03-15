import { DashboardPageView } from "@/components/PageViews/DashboardPageView";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { useAppSelector } from "@/store/hooks";

const DashboardPage: React.FC = () => {
  const vocabList = useAppSelector((state) => state.vocab);

  const { loading } = useAuthRedirect({
    redirectTo: "/sign-in",
    authRequired: true,
  });

  return loading ? null : <DashboardPageView vocabList={vocabList} />;
};
export default DashboardPage;
