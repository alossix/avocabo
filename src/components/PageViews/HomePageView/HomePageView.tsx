import { theme } from "@/styles/theme";
import styled from "@emotion/styled";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import VocabExampleAfter from "../../../../public/images/vocab-card-example-after.png";
import VocabExampleBefore from "../../../../public/images/vocab-card-example-before.png";

export const HomePageView: React.FC = () => {
  const { t } = useTranslation("about");

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
            <Image src={VocabExampleBefore} alt={"vocab-1"} width={300} />
            <Image src={VocabExampleAfter} alt={"vocab-2"} width={300} />
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

  [`@media (min-width: ${theme.breakpoints.desktop})`]: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
