import { AddWordForm } from "@/components/Forms/AddWordForm";
import { Toast } from "@/components/UI/Toast";
import styled from "@emotion/styled";
import useTranslation from "next-translate/useTranslation";

export const AddWordsPageView: React.FC = () => {
  const { t } = useTranslation("common");
  return (
    <AddWordsPageContainer>
      <h1>{t("common:header_add_words")}</h1>
      <AddWordForm />
      <Toast toastType="success" toastText="Entry added successfully" />
    </AddWordsPageContainer>
  );
};

const AddWordsPageContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  width: "50%",
});
