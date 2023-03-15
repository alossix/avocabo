import { theme } from "@/styles/theme";
import { InterfaceLanguages } from "@/types/general";
import styled from "@emotion/styled";
import setLanguage from "next-translate/setLanguage";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";

export const LanguageSelector: React.FC = () => {
  const { t, lang } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState<InterfaceLanguages>(
    lang as InterfaceLanguages
  );

  const handleSelectLanguage = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedLanguage(event.target.value as InterfaceLanguages);
    setLanguage(event.target.value as InterfaceLanguages);
  };

  return (
    <LanguageSelectorContainer>
      <label
        htmlFor="language-select"
        style={{
          paddingTop: 2,
        }}
      >
        🌐
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
};

const LanguageSelectorContainer = styled.div({
  display: "flex",
  alignItems: "center",
  gap: 8,
});

const StyledSelectMenu = styled.select({
  padding: "4px 8px",
  borderRadius: 4,
  border: `1px solid ${theme.colors.darkAvocado}`,
  color: theme.colors.black,
  backgroundColor: theme.colors.white,
});
