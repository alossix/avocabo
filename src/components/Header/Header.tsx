import { listenForAuthChanges, signOut } from "@/store/authSlice";
import { AppDispatch, RootState, useAppDispatch } from "@/store/store";
import styled from "@emotion/styled";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { LanguageSelector } from "../LanguageSelector";

export const Header: React.FC = () => {
  const { t } = useTranslation("common");
  const dispatch: AppDispatch = useAppDispatch();

  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    dispatch(listenForAuthChanges());
  }, [dispatch]);

  return (
    <HeaderNav>
      <HeaderContent>
        <HeaderUL role="list">
          <HeaderLI aria-label={t("common:header_home")} tabIndex={1}>
            <Link href="/">{t("common:header_home")}</Link>
          </HeaderLI>
          <HeaderLI aria-label={t("common:header_my_vocab")} tabIndex={2}>
            <Link href="/my-vocab">{t("common:header_my_vocab")}</Link>
          </HeaderLI>
          <HeaderLI aria-label={t("common:header_add_words")} tabIndex={3}>
            <Link href="/add-words">{t("common:header_add_words")}</Link>
          </HeaderLI>
          <HeaderLI aria-label={t("common:header_how_it_works")} tabIndex={4}>
            <Link href="/about">{t("common:header_how_it_works")}</Link>
          </HeaderLI>
          {user ? (
            <HeaderLI aria-label={t("common:header_sign_out")} tabIndex={5}>
              <Link href="/" onClick={() => dispatch(signOut())}>
                {t("common:header_sign_out")}{" "}
              </Link>
            </HeaderLI>
          ) : (
            <>
              <HeaderLI aria-label={t("common:header_sign_in")} tabIndex={5}>
                <Link href="/sign-in">{t("common:header_sign_in")} </Link>
              </HeaderLI>
              <HeaderLI aria-label={t("common:header_sign_up")} tabIndex={6}>
                <Link href="/sign-up">{t("common:header_sign_up")} </Link>
              </HeaderLI>
            </>
          )}

          <HeaderLI aria-label={t("common:header_language")} tabIndex={7}>
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
