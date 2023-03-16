import { theme } from "@/styles/theme";
import { InterfaceLanguages, LearningLanguages } from "@/types/general";
import styled from "@emotion/styled";
import useTranslation from "next-translate/useTranslation";
import React from "react";

type LanguageSelectorProps = {
  handleSelectLanguage: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedLanguage: InterfaceLanguages | LearningLanguages;
  showIcon?: boolean;
};

export const LanguageSelector = React.forwardRef<
  HTMLDivElement,
  LanguageSelectorProps
>(({ handleSelectLanguage, selectedLanguage, showIcon = true }, ref) => {
  const { t } = useTranslation();

  return (
    <LanguageSelectorContainer ref={ref}>
      <label
        htmlFor="language-select"
        style={{
          paddingTop: 2,
        }}
      >
        {showIcon && `🌐`}
      </label>
      <StyledSelectMenu
        id="language-select"
        value={selectedLanguage}
        onChange={handleSelectLanguage}
      >
        <option value="" disabled aria-disabled>
          {t("common:header_language")}
        </option>
        <option value="ct">Català</option>
        <option value="en">English</option>
        <option value="it">Italiano</option>
        <option value="es">Español</option>
        <option value="nl">Nederlands</option>
      </StyledSelectMenu>
    </LanguageSelectorContainer>
  );
});

LanguageSelector.displayName = "LanguageSelector";

const LanguageSelectorContainer = styled.div({
  display: "flex",
  alignItems: "center",
  gap: 8,
});

const StyledSelectMenu = styled.select({
  padding: "2px 4px",
  borderRadius: 4,
  border: `1px solid ${theme.colors.darkAvocado}`,
  color: theme.colors.black,
  backgroundColor: theme.colors.white,
});
