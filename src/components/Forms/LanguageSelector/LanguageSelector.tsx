import { theme } from "@/styles/theme";
import { InterfaceLanguages, LearningLanguages } from "@/types/general";
import styled from "@emotion/styled";
import useTranslation from "next-translate/useTranslation";
import React from "react";

type LanguageSelectorProps = {
  handleSelectLanguage: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  languageSet: "interface" | "learning";
  selectedLanguage: InterfaceLanguages | LearningLanguages;
  showIcon?: boolean;
};

const languageLabelsInterface: Record<InterfaceLanguages, string> = {
  ca: "Català",
  de: "Deutsch",
  en: "English",
  es: "Español",
  fr: "Français",
  it: "Italiano",
  nl: "Nederlands",
  uk: "Українська",
};

export const LanguageSelector = React.forwardRef<
  HTMLDivElement,
  LanguageSelectorProps
>(
  (
    { handleSelectLanguage, languageSet, selectedLanguage, showIcon = true },
    ref
  ) => {
    const { t } = useTranslation();

    const languageLabelsLearning: Record<LearningLanguages, string> = {
      ...languageLabelsInterface,
      other: t("common:other"),
    };

    const createLanguageOptions = () => {
      const labels =
        languageSet === "interface"
          ? languageLabelsInterface
          : languageLabelsLearning;
      return (Object.keys(labels) as Array<keyof typeof labels>).map((key) => ({
        value: key,
        label: labels[key],
      }));
    };

    const languageOptions = createLanguageOptions();

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
  }
);

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
  color: theme.colors.lightBlack,
  backgroundColor: theme.colors.white,
});
