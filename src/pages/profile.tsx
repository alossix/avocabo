import { selectUserSignedIn } from "@/store/authSlice";
import { useAppSelector } from "@/store/hooks";

const ProfilePage: React.FC = () => {
  const user = useAppSelector(selectUserSignedIn);

  return <div>{user?.displayName}</div>;
};
export default ProfilePage;
