import { useAppSelector } from "@/store/hooks";

const DashboardPage: React.FC = () => {
  const vocab = useAppSelector((state) => state.vocab);

  return (
    <div>
      <h1>Dashboard</h1>
      {vocab.map((word) => (
        <p key={word.vocabId}>{`${word.vocabId} ${word.definition}`}</p>
      ))}
      <p>{vocab.length}</p>
    </div>
  );
};
export default DashboardPage;
