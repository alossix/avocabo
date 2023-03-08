import useTranslation from "next-translate/useTranslation";

export const HomePageView: React.FC = () => {
  const { t } = useTranslation("about");

  return (
    <div>
      <h1>{t("about:home.title")}</h1>

      <section>
        <h3>{t("about:home.section1Title")}</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: t("about:home.section1Text"),
          }}
        />
      </section>

      <section>
        <h3>{t("about:home.section2Title")}</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: t("about:home.section2Text"),
          }}
        />
      </section>
    </div>
  );
};
