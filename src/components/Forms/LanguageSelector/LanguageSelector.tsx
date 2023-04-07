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

type LanguageLabels = InterfaceLanguages | LearningLanguages;

type LanguageMapping = {
  [K in LanguageLabels]: K;
};

const languageMapping: LanguageMapping = {
  ca: "ca",
  en: "en",
  es: "es",
  de: "de",
  fr: "fr",
  it: "it",
  nl: "nl",
  uk: "uk",
};

const languageLabels: Record<InterfaceLanguages | LearningLanguages, string> = {
  ca: "Català",
  en: "English",
  es: "Español",
  de: "Deutsch",
  fr: "Français",
  it: "Italiano",
  nl: "Nederlands",
  uk: "Українська",
};

const createLanguageOptions = () => {
  return (Object.keys(languageMapping) as Array<keyof LanguageMapping>).map(
    (key) => ({
      value: languageMapping[key],
      label: languageLabels[languageMapping[key]],
    })
  );
};

const languageOptions = createLanguageOptions();

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
        {showIcon && (
          <div style={{ opacity: 0.5, filter: "saturate(0)" }}>🌐</div>
        )}
      </label>
      <StyledSelectMenu
        id="language-select"
        onChange={handleSelectLanguage}
        tabIndex={0}
        value={selectedLanguage}
      >
        <option value="" disabled aria-disabled>
          {t("common:header_language")}
        </option>
        {languageOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
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
  border: `1px solid ${theme.colors.mediumGrey}`,
  color: theme.colors.black,
  backgroundColor: theme.colors.white,
});
