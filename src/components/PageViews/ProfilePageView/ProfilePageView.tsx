import { useAppSelector } from "@/store/hooks";
import { selectUserSignedIn } from "@/store/slices/authSlice";
import { Vocab } from "@/types/vocab";
import useTranslation from "next-translate/useTranslation";

type ProfilePageViewProps = {
  vocabList: Vocab[];
};

export const ProfilePageView: React.FC<ProfilePageViewProps> = ({
  vocabList,
}) => {
  const { t } = useTranslation("common");
  const currentUser = useAppSelector(selectUserSignedIn);

  return (
    <div>
      <h1>{t("common:header_profile")}</h1>
      {vocabList.map((word) => (
        <p key={word.vocabId}>{`${word.vocabId} ${word.definition}`}</p>
      ))}
      <p>{vocabList.length}</p>
      <p>{currentUser?.email}</p>
    </div>
  );
};
