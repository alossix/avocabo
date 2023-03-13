import { useAppSelector } from "@/store/hooks";
import { selectUserSignedIn } from "@/store/slices/authSlice";

const DashboardPage: React.FC = () => {
  const user = useAppSelector(selectUserSignedIn);
  const vocab = useAppSelector((state) => state.vocab);

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>{user?.displayName}</h2>
      {vocab.map((word) => (
        <p key={word.vocabId}>{word.definition}</p>
      ))}
    </div>
  );
};
export default DashboardPage;
