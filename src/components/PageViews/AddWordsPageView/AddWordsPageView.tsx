import { AddWordForm } from "@/components/Forms/AddWordForm";
import { AppUser } from "@/types/general";
import styled from "@emotion/styled";
import useTranslation from "next-translate/useTranslation";

export const AddWordsPageView: React.FC<{ currentUser: AppUser }> = ({
  currentUser,
}) => {
  const { t } = useTranslation("common");

  return (
    <AddWordsPageContainer>
      <h1>{t("common:header_add_words")}</h1>
      <AddWordForm currentUser={currentUser} />
    </AddWordsPageContainer>
  );
};

const AddWordsPageContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  width: "100%",
});
