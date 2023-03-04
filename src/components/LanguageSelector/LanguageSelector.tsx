import { InterfaceLanguages } from "@/types/general";
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
    <div>
      <label htmlFor="language-select">{t("common:header_language")}</label>
      <select
        id="language-select"
        value={selectedLanguage}
        onChange={handleSelectLanguage}
      >
        <option value="ct">CT</option>
        <option value="en">EN</option>
        <option value="it">IT</option>
        <option value="es">ES</option>
      </select>
    </div>
  );
};
