import { selectUserSignedIn } from "@/store/slices/authSlice";
import { useAppSelector } from "@/store/hooks";

const DashboardPage: React.FC = () => {
  const user = useAppSelector(selectUserSignedIn);

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>{user?.displayName}</h2>
    </div>
  );
};
export default DashboardPage;
