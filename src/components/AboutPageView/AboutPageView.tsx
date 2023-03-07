import useTranslation from "next-translate/useTranslation";

export const AboutPageView: React.FC = () => {
  const { t } = useTranslation("about");

  return (
    <div>
      <h1>{t("about:howItWorks.title")}</h1>

      <section>
        <h3>{t("about:howItWorks.section1Title")}</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: t("about:howItWorks.section1Text"),
          }}
        />
      </section>

      <section>
        <h3>{t("about:howItWorks.section2Title")}</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: t("about:howItWorks.section2Text"),
          }}
        />
      </section>

      <section>
        <h3>{t("about:howItWorks.section3Title")}</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: t("about:howItWorks.section3Text"),
          }}
        />
      </section>
    </div>
  );
};
