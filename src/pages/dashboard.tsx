import { selectUserSignedIn } from "@/store/slices/authSlice";
import { useAppSelector } from "@/store/hooks";

const DashboardPage: React.FC = () => {
  const user = useAppSelector(selectUserSignedIn);

  return <div>{user?.displayName}</div>;
};
export default DashboardPage;
