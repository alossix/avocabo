import { auth, onAuthStateChanged } from "@/services/firebase/firebaseService";
import { signOutAuth } from "@/store/slices/authSlice";
import { AppDispatch, useAppDispatch } from "@/store/store";
import { theme } from "@/styles/theme";
import styled from "@emotion/styled";
import { User } from "firebase/auth";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "../Button";

export const Header: React.FC = () => {
  const { t } = useTranslation("common");
  const dispatch: AppDispatch = useAppDispatch();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleOnKeyDown = ({
    event,
    path,
    signOut = false,
  }: {
    event: React.KeyboardEvent<HTMLLIElement | HTMLButtonElement>;
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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <HeaderNav>
      <HeaderContent>
        <HeaderUL role="list">
          <HeaderLI
            aria-label={t("common:header_home")}
            onKeyDown={(event) => handleOnKeyDown({ event, path: "/" })}
            role="link"
            tabIndex={0}
            style={{
              fontWeight: "bold",
              fontSize: 32,
            }}
          >
            <HeaderLink href="/">{t("common:header_home")}</HeaderLink>
          </HeaderLI>
          {currentUser && (
            <>
              <HeaderLI
                aria-label={t("common:header_my_vocab")}
                onKeyDown={(event) =>
                  handleOnKeyDown({ event, path: "/my-vocab" })
                }
                role="listitem"
                tabIndex={0}
              >
                <HeaderLink href="/my-vocab">
                  {t("common:header_my_vocab")}
                </HeaderLink>
              </HeaderLI>
              <HeaderLI
                aria-label={t("common:header_add_words")}
                onKeyDown={(event) =>
                  handleOnKeyDown({ event, path: "/add-words" })
                }
                role="listitem"
                tabIndex={0}
              >
                <HeaderLink href="/add-words">
                  {t("common:header_add_words")}
                </HeaderLink>
              </HeaderLI>
            </>
          )}
          <HeaderLI
            aria-label={t("common:header_how_it_works")}
            onKeyDown={(event) => handleOnKeyDown({ event, path: "/about" })}
            role="listitem"
            tabIndex={0}
          >
            <HeaderLink href="/about">
              {t("common:header_how_it_works")}
            </HeaderLink>
          </HeaderLI>
          {currentUser ? (
            <HeaderLI
              aria-label={t("common:header_sign_out")}
              onKeyDown={(event) =>
                handleOnKeyDown({ event, path: "/", signOut: true })
              }
              role="listitem"
              tabIndex={0}
            >
              <HeaderLink
                href="/"
                onClick={() => {
                  dispatch(signOutAuth());
                  router.push("/");
                }}
              >
                {t("common:header_sign_out")}
              </HeaderLink>
            </HeaderLI>
          ) : (
            <>
              <HeaderLI
                aria-label={t("common:sign_in")}
                onKeyDown={(event) =>
                  handleOnKeyDown({ event, path: "/sign-in" })
                }
                role="listitem"
                tabIndex={0}
              >
                <HeaderLink href="/sign-in">{t("common:sign_in")}</HeaderLink>
              </HeaderLI>
              <Button
                ariaLabel={t("common:sign_up")}
                onClick={() => router.push("/sign-up")}
                onKeyDown={(event) =>
                  handleOnKeyDown({ event, path: "/sign-up" })
                }
                title={t("common:sign_up")}
              >
                {t("common:sign_up")}
              </Button>
            </>
          )}
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
  boxShadow: `rgba(60, 64, 67, 0.05) 0px 1px 1px 0px,
    rgba(60, 64, 67, 0.05) 0px 1px 3px 1px`,
});

const HeaderContent = styled.header({
  display: "flex",
  width: "100%",
});

const HeaderUL = styled.ul({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  listStyle: "none",
  padding: 0,
});

const HeaderLI = styled.li({
  display: "flex",
  alignItems: "center",
  fontWeight: "bold",
});

const HeaderLink = styled(Link)({
  textDecoration: "none",
  color: theme.colors.black,

  "&:visited": { color: theme.colors.black },
  "&:active": {
    color: theme.colors.darkAvocado,
  },
  "&:hover": {
    color: theme.colors.darkAvocado,
  },
});
