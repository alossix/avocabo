import { Toast } from "@/components/UI/Toast";
import { VocabCardExample } from "@/components/Vocab/VocabCardExample";
import {
  exampleVocabEntryCA,
  exampleVocabEntryDE,
  exampleVocabEntryEN,
  exampleVocabEntryES,
  exampleVocabEntryFR,
  exampleVocabEntryIT,
  exampleVocabEntryNL,
  exampleVocabEntryUK,
} from "@/lib/exampleVocabEntry/exampleVocabEntry";
import { theme } from "@/styles/theme";
import { Vocab } from "@/types/vocab";
import styled from "@emotion/styled";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";

const languageVocabMap: {
  [languageCode: string]: { [vocabId: string]: Vocab };
} = {
  ca: exampleVocabEntryCA,
  de: exampleVocabEntryDE,
  en: exampleVocabEntryEN,
  es: exampleVocabEntryES,
  fr: exampleVocabEntryFR,
  it: exampleVocabEntryIT,
  nl: exampleVocabEntryNL,
  uk: exampleVocabEntryUK,
};

export const HomePageView: React.FC = () => {
  const { lang, t } = useTranslation("about");
  const [messageText, setMessageText] = useState<string>("");

  return (
    <HomePageViewContainer>
      <h1>{t("about:home.title")}</h1>
      <p>{t("about:home.subtitle")}</p>
      <p>{t("about:home.subtitleText")}</p>

      <section>
        <h2>{t("about:home.section1Title")}</h2>
        <p>{t("about:home.section1Text")}</p>
      </section>

      <section>
        <h3>{t("about:home.section2Title")}</h3>
        <p>{t("about:home.section2Text")}</p>
      </section>

      <section>
        <h3>{t("about:home.section3Title")}</h3>
        <p>{t("about:home.section3Text")}</p>
      </section>

      <section>
        <h3>{t("about:home.section4Title")}</h3>
        <p>{t("about:home.section4Text")}</p>
      </section>

      <section>
        <h3>{t("about:home.section5Title")}</h3>
        <p>{t("about:home.section5Text")}</p>
        <p>{t("about:home.section5Text2")}</p>
      </section>

      <section>
        <HeroContainer>
          <h2 style={{ marginTop: 16 }}>{t("common:example")}</h2>
          <VocabCardExample
            vocabWord={Object.values(languageVocabMap[lang])[0]}
            setMessageText={setMessageText}
          />
          {messageText && (
            <Toast
              duration={5000}
              onClose={() => setMessageText("")}
              toastText={messageText}
              toastType={"success"}
            />
          )}
        </HeroContainer>
      </section>
    </HomePageViewContainer>
  );
};

const HomePageViewContainer = styled.section({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  width: "100%",
});

const HeroContainer = styled.section({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  alignItems: "center",
  margin: "4px 0",
  padding: 16,
  backgroundColor: theme.colors.UILightGreen,
  borderRadius: 4,
});
