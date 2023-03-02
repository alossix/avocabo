import styled from "@emotion/styled";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

export const Header: React.FC = () => {
  const { t, lang } = useTranslation("common");
  const router = useRouter();

  return (
    <HeaderNav>
      <HeaderContent>
        <HeaderUL>
          <HeaderLI>
            <Link href="/">{t("common:header_home")}</Link>
          </HeaderLI>
          <HeaderLI>
            <Link href="/my-vocab">{t("common:header_my_vocab")}</Link>
          </HeaderLI>
          <HeaderLI>
            <Link href="/add-words">{t("common:header_add_words")}</Link>
          </HeaderLI>
          <HeaderLI>
            <Link href="/about">{t("common:header_how_it_works")}</Link>
          </HeaderLI>
          <HeaderLI>
            <Link href={router.asPath} locale={"en"} key={"en"}>
              {t("common:header_switch_language")}
            </Link>
          </HeaderLI>
          <HeaderLI>Menu</HeaderLI>
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
