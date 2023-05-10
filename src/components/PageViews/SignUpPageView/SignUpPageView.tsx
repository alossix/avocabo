import { SignUpForm } from "@/components/Forms/SignUpForm";
import { theme } from "@/styles/theme";
import styled from "@emotion/styled";
import useTranslation from "next-translate/useTranslation";

export const SignUpPageView: React.FC = () => {
  const { t } = useTranslation();

  return (
    <SignUpPageViewContainer>
      <h1>{t("common:sign_up")}</h1>
      <SignUpForm />
    </SignUpPageViewContainer>
  );
};

const SignUpPageViewContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  width: "100%",

  [`@media (min-width: ${theme.breakpoints.desktop})`]: {
    alignItems: "center",
  },
});
