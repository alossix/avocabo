import { SignInForm } from "@/components/Forms/SignInForm";
import { Toast } from "@/components/UI/Toast";
import styled from "@emotion/styled";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";

export const SignInPageView: React.FC = () => {
  const { t } = useTranslation();
  const [errorMessageText, setErrorMessageText] = useState<string>("");
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

  return (
    <SignInPageViewContainer>
      <h1>{t("common:sign_in")}</h1>
      <SignInForm
        setErrorMessageText={setErrorMessageText}
        setShowErrorMessage={setShowErrorMessage}
      />
      {showErrorMessage && (
        <Toast toastType="error" toastText={errorMessageText} />
      )}
    </SignInPageViewContainer>
  );
};

const SignInPageViewContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  width: "50%",
});
