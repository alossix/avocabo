import { Vocab } from "@/types/vocab";
import useTranslation from "next-translate/useTranslation";

type ProfilePageViewProps = {
  vocabList: Vocab[];
};

export const ProfilePageView: React.FC<ProfilePageViewProps> = ({
  vocabList,
}) => {
  const { t } = useTranslation("common");

  return (
    <div>
      <h1>{t("common.header_profile")}</h1>
      {vocabList.map((word) => (
        <p key={word.vocabId}>{`${word.vocabId} ${word.definition}`}</p>
      ))}
      <p>{vocabList.length}</p>
    </div>
  );
};
