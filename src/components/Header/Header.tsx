import {
  listenForAuthChanges,
  selectUserSignedIn,
  signOutAuth,
} from "@/store/authSlice";
import { useAppSelector } from "@/store/hooks";
import { AppDispatch, useAppDispatch } from "@/store/store";
import styled from "@emotion/styled";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { LanguageSelector } from "../LanguageSelector";

export const Header: React.FC = () => {
  const { t } = useTranslation("common");
  const dispatch: AppDispatch = useAppDispatch();
  const router = useRouter();
  const userSignedIn = useAppSelector(selectUserSignedIn);

  const handleOnKeyDown = ({
    event,
    path,
    signOut = false,
  }: {
    event: React.KeyboardEvent<HTMLLIElement>;
    path: string;
    signOut?: boolean;
  }) => {
    if (signOut) {
      dispatch(signOutAuth());
    }
    if (event.key === "Enter") {
      router.push(path);
    }
  };

  useEffect(() => {
    dispatch(listenForAuthChanges());
  }, [dispatch]);

  return (
    <HeaderNav>
      <HeaderContent>
        <HeaderUL role="list">
          <HeaderLI
            aria-label={t("common:header_home")}
            onKeyDown={(event) => handleOnKeyDown({ event, path: "/" })}
            role="listitem"
            tabIndex={0}
          >
            <Link href="/">{t("common:header_home")}</Link>
          </HeaderLI>
          {userSignedIn && (
            <>
              <HeaderLI
                aria-label={t("common:header_my_vocab")}
                onKeyDown={(event) =>
                  handleOnKeyDown({ event, path: "/my-vocab" })
                }
                role="listitem"
                tabIndex={0}
              >
                <Link href="/my-vocab">{t("common:header_my_vocab")}</Link>
              </HeaderLI>
              <HeaderLI
                aria-label={t("common:header_add_words")}
                onKeyDown={(event) =>
                  handleOnKeyDown({ event, path: "/add-words" })
                }
                role="listitem"
                tabIndex={0}
              >
                <Link href="/add-words">{t("common:header_add_words")}</Link>
              </HeaderLI>
            </>
          )}
          <HeaderLI
            aria-label={t("common:header_how_it_works")}
            onKeyDown={(event) => handleOnKeyDown({ event, path: "/about" })}
            role="listitem"
            tabIndex={0}
          >
            <Link href="/about">{t("common:header_how_it_works")}</Link>
          </HeaderLI>
          {userSignedIn ? (
            <HeaderLI
              aria-label={t("common:header_sign_out")}
              onKeyDown={(event) =>
                handleOnKeyDown({ event, path: "/", signOut: true })
              }
              role="listitem"
              tabIndex={0}
            >
              <Link
                href="/"
                onClick={() => {
                  dispatch(signOutAuth());
                  router.push("/");
                }}
              >
                {t("common:header_sign_out")}
              </Link>
            </HeaderLI>
          ) : (
            <>
              <HeaderLI
                aria-label={t("common:header_sign_up")}
                onKeyDown={(event) =>
                  handleOnKeyDown({ event, path: "/sign-up" })
                }
                role="listitem"
                tabIndex={0}
              >
                <Link href="/sign-up">{t("common:header_sign_up")}</Link>
              </HeaderLI>
              <HeaderLI
                aria-label={t("common:header_sign_in")}
                onKeyDown={(event) =>
                  handleOnKeyDown({ event, path: "/sign-in" })
                }
                role="listitem"
                tabIndex={0}
              >
                <Link href="/sign-in">{t("common:header_sign_in")}</Link>
              </HeaderLI>
            </>
          )}

          <HeaderLI aria-label={t("common:header_language")} tabIndex={0}>
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
