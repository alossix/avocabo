import { SignInForm } from "@/components/Forms/SignInForm";
import { theme } from "@/styles/theme";
import styled from "@emotion/styled";
import useTranslation from "next-translate/useTranslation";

export const SignInPageView: React.FC = () => {
  const { t } = useTranslation();

  return (
    <SignInPageViewContainer>
      <h1>{t("common:sign_in")}</h1>
      <SignInForm />
    </SignInPageViewContainer>
  );
};

const SignInPageViewContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  width: "100%",

  [`@media (min-width: ${theme.breakpoints.desktop})`]: {
    alignItems: "center",
  },
});
