import { Toast } from "@/components/UI/Toast";
import { VocabCardExample } from "@/components/Vocab/VocabCardExample";
import { initialVocabSetCA } from "@/lib/initialVocabSets/ca";
import { initialVocabSetDE } from "@/lib/initialVocabSets/de";
import { initialVocabSetEN } from "@/lib/initialVocabSets/en";
import { initialVocabSetES } from "@/lib/initialVocabSets/es";
import { initialVocabSetFR } from "@/lib/initialVocabSets/fr";
import { initialVocabSetIT } from "@/lib/initialVocabSets/it";
import { initialVocabSetNL } from "@/lib/initialVocabSets/nl";
import { initialVocabSetOther } from "@/lib/initialVocabSets/other";
import { initialVocabSetUK } from "@/lib/initialVocabSets/uk";
import { theme } from "@/styles/theme";
import { Vocab } from "@/types/vocab";
import styled from "@emotion/styled";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";

export const HomePageView: React.FC = () => {
  const { lang, t } = useTranslation("about");
  const [messageText, setMessageText] = useState<string>("");

  let vocabSet: Vocab;
  switch (lang) {
    case "ca":
      vocabSet = Object.values(initialVocabSetCA)[0];
      break;
    case "de":
      vocabSet = Object.values(initialVocabSetDE)[0];
      break;
    case "en":
      vocabSet = Object.values(initialVocabSetEN)[0];
      break;
    case "es":
      vocabSet = Object.values(initialVocabSetES)[0];
      break;
    case "fr":
      vocabSet = Object.values(initialVocabSetFR)[0];
      break;
    case "it":
      vocabSet = Object.values(initialVocabSetIT)[0];
      break;
    case "nl":
      vocabSet = Object.values(initialVocabSetNL)[0];
      break;
    case "other":
      vocabSet = Object.values(initialVocabSetOther)[0];
      break;
    case "uk":
      vocabSet = Object.values(initialVocabSetUK)[0];
      break;
    default:
      vocabSet = Object.values(initialVocabSetEN)[0]; // default language
  }

  return (
    <HomePageViewContainer>
      <h1>{t("about:home.title")}</h1>

      <section>
        <h2>{t("about:home.section1Title")}</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: t("about:home.section1Text"),
          }}
        />
      </section>

      <section>
        <h2>{t("about:home.section2Title")}</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: t("about:home.section2Text"),
          }}
        />
        <section>
          <h2 style={{ marginTop: 16 }}>{t("common:example")}</h2>
          <HeroContainer>
            <VocabCardExample
              vocabWord={vocabSet}
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
  position: "absolute",
  left: 0,
  right: 0,
  margin: "4px 0",
  padding: 16,
  backgroundColor: theme.colors.UILightGreen,
});
