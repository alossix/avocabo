import useTranslation from "next-translate/useTranslation";

export const AboutPageView: React.FC = () => {
  const { t } = useTranslation("about");

  return (
    <section style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <h1>{t("about:howItWorks.title")}</h1>

      <section>
        <h2>{t("about:howItWorks.section1Title")}</h2>
        <p>{t("about:howItWorks.section1Text")}</p>
      </section>

      <section>
        <h3>{t("about:howItWorks.section2Title")}</h3>
        <p>{t("about:howItWorks.section2Text")}</p>
        <p>{t("about:howItWorks.section2Text2")}</p>
      </section>

      <section>
        <h3>{t("about:howItWorks.section3Title")}</h3>
        <p>{t("about:howItWorks.section3Text")}</p>
      </section>

      <section>
        <h3>{t("about:howItWorks.section4Title")}</h3>
        <p>{t("about:howItWorks.section4Text")}</p>
      </section>

      <section>
        <h3>{t("about:howItWorks.section5Title")}</h3>
        <p>{t("about:howItWorks.section5Text")}</p>
        <p>{t("about:howItWorks.section5Text2")}</p>
        <p>{t("about:howItWorks.section5Text3")}</p>
      </section>
    </section>
  );
};
