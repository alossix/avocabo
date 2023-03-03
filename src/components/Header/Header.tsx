import styled from "@emotion/styled";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { LanguageSelector } from "../LanguageSelector";

export const Header: React.FC = () => {
  const { t } = useTranslation("common");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
    if (event.key === "Enter") {
      event.currentTarget.click();
    }
  };

  return (
    <HeaderNav>
      <HeaderContent>
        <HeaderUL>
          <HeaderLI
            aria-label={t("common:header_home")}
            tabIndex={0}
            onKeyDown={handleKeyDown}
          >
            <Link href="/">{t("common:header_home")}</Link>
          </HeaderLI>
          <HeaderLI
            aria-label={t("common:header_my_vocab")}
            tabIndex={0}
            onKeyDown={handleKeyDown}
          >
            <Link href="/my-vocab">{t("common:header_my_vocab")}</Link>
          </HeaderLI>
          <HeaderLI
            aria-label={t("common:header_add_words")}
            tabIndex={0}
            onKeyDown={handleKeyDown}
          >
            <Link href="/add-words">{t("common:header_add_words")}</Link>
          </HeaderLI>
          <HeaderLI
            aria-label={t("common:header_how_it_works")}
            tabIndex={0}
            onKeyDown={handleKeyDown}
          >
            <Link href="/about">{t("common:header_how_it_works")}</Link>
          </HeaderLI>
          <HeaderLI
            aria-label={t("common:header_language")}
            tabIndex={0}
            onKeyDown={handleKeyDown}
          >
            <LanguageSelector />
          </HeaderLI>
        </HeaderUL>
      </HeaderContent>
    </HeaderNav>
  );
};

const HeaderNav = styled.nav({
  display: "flex",
  justifyContent: "space-between",
  gridArea: "1 / 1 / 2 / 9",
  padding: 8,
  border: "2px solid blue",
  width: "100%",
});

const HeaderContent = styled.header({
  display: "flex",
  width: "100%",
});

const HeaderUL = styled.ul({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  listStyle: "none",
  padding: 0,
});

const HeaderLI = styled.li({
  display: "flex",
  alignItems: "center",
});
