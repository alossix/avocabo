import { AddWordForm } from "@/components/Forms/AddWordForm";
import { Toast } from "@/components/UI/Toast";
import { AppUser } from "@/types/general";
import styled from "@emotion/styled";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";

export const AddWordsPageView: React.FC<{ currentUser: AppUser }> = ({
  currentUser,
}) => {
  const { t } = useTranslation("common");
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

  return (
    <AddWordsPageContainer>
      <h1>{t("common:header_add_words")}</h1>
      <AddWordForm
        currentUser={currentUser}
        setShowErrorMessage={setShowErrorMessage}
        setShowSuccessMessage={setShowSuccessMessage}
      />
      {showSuccessMessage && (
        <Toast toastType="success" toastText={t("vocab:vocab_added_success")} />
      )}
      {showErrorMessage && (
        <Toast toastType="error" toastText={t("vocab:vocab_added_error")} />
      )}
    </AddWordsPageContainer>
  );
};

const AddWordsPageContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  width: "50%",
});