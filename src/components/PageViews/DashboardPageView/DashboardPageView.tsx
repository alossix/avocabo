import { Vocab } from "@/types/vocab";

type DashboardPageViewProps = {
  vocabList: Vocab[];
};

export const DashboardPageView: React.FC<DashboardPageViewProps> = ({
  vocabList,
}) => {
  return (
    <div>
      <h1>Dashboard</h1>
      {vocabList.map((word) => (
        <p key={word.vocabId}>{`${word.vocabId} ${word.definition}`}</p>
      ))}
      <p>{vocabList.length}</p>
    </div>
  );
};
