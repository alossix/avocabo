import styled from "@emotion/styled";
import { LanguageSelector } from "../LanguageSelector";

export const Footer: React.FC = () => {
  return (
    <FooterContent>
      <p>Footer first</p>

      <LanguageSelector />
    </FooterContent>
  );
};

const FooterContent = styled.footer({
  display: "flex",
  justifyContent: "space-between",
  gridArea: "8 / 1 / 9 / 9",
  padding: 8,
  boxShadow: `rgba(60, 64, 67, 0.05) 0px -1px 1px 0px,
             rgba(60, 64, 67, 0.05) 0px -1px 3px 1px`,
});
