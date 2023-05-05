import { SignUpForm } from "@/components/Forms/SignUpForm";
import { Toast } from "@/components/UI/Toast";
import { theme } from "@/styles/theme";
import styled from "@emotion/styled";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";

export const SignUpPageView: React.FC = () => {
  const { t } = useTranslation();
  const [errorMessageText, setErrorMessageText] = useState<string>("");
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);

  return (
    <SignUpPageViewContainer>
      <h1>{t("common:sign_up")}</h1>
      <SignUpForm
        setShowErrorMessage={setShowErrorMessage}
        setErrorMessageText={setErrorMessageText}
      />
      {showErrorMessage && (
        <Toast toastType="error" toastText={errorMessageText} />
      )}
    </SignUpPageViewContainer>
  );
};

const SignUpPageViewContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  width: "100%",

  [`@media (min-width: ${theme.breakpoints.desktop})`]: {
    width: "50%",
  },
});
