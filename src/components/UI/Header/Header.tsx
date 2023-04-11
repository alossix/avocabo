import { useAppSelector } from "@/store/hooks";
import { signOutAuth, updateUserAuth } from "@/store/slices/authSlice";
import { setInterfaceLanguage } from "@/store/slices/interfaceLanguageSlice";
import { AppDispatch, useAppDispatch } from "@/store/store";
import { theme } from "@/styles/theme";
import { InterfaceLanguages } from "@/types/general";
import styled from "@emotion/styled";
import setLanguage from "next-translate/setLanguage";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { LanguageSelector } from "../../Forms/LanguageSelector";
import { Button } from "../Button";
import { HamburgerMenu } from "../HamburgerMenu";

export const Header: React.FC<{
  mainContentRef: React.RefObject<HTMLDivElement>;
}> = ({ mainContentRef }) => {
  const { t } = useTranslation("common");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentUser = useAppSelector((state) => state.auth.user);
  const dispatch: AppDispatch = useAppDispatch();
  const headerRef = useRef<HTMLDivElement | null>(null);
  const initialLanguage = useAppSelector(
    (state) => state.interfaceLanguage.interfaceLanguage
  );
  const languageSelectorRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const handleSelectInterfaceLanguage = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newInterfaceLanguage = event.target.value as InterfaceLanguages;
    // set language in next-translate context
    setLanguage(newInterfaceLanguage);

    if (currentUser) {
      // update user object in both firebase and local state
      dispatch(updateUserAuth({ interfaceLanguage: newInterfaceLanguage }));
    } else {
      // no user logged in, set a new local state only
      dispatch(setInterfaceLanguage(newInterfaceLanguage));
    }
  };

  const handleInteractWithMenu = ({
    event,
    path,
    signOut = false,
  }: {
    event:
      | React.KeyboardEvent<HTMLLIElement | HTMLButtonElement>
      | React.MouseEvent<HTMLAnchorElement>;
    path: string;
    signOut?: boolean;
  }) => {
    if (currentUser && signOut) {
      dispatch(signOutAuth(currentUser));
    }
    const isKeyboardEvent = (
      event: React.KeyboardEvent | React.MouseEvent
    ): event is React.KeyboardEvent => {
      return event.type === "keydown";
    };

    if (
      (isKeyboardEvent(event) && event.key === "Enter") ||
      event.type === "click"
    ) {
      setMobileMenuOpen(false);
      router.push(path);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      mobileMenuOpen &&
      headerRef.current &&
      mainContentRef.current &&
      !headerRef.current.contains(event.target as Node) &&
      mainContentRef.current.contains(event.target as Node)
    ) {
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileMenuOpen]);

  return (
    <HeaderNav ref={headerRef}>
      <HeaderContent
        onClick={() => {
          if (mobileMenuOpen) {
            setMobileMenuOpen(false);
          }
        }}
      >
        <LeftContent>
          <HeaderItem
            aria-label={t("common:header_home")}
            onKeyDown={(event) => handleInteractWithMenu({ event, path: "/" })}
            role="link"
            tabIndex={0}
            style={{
              fontWeight: "bold",
              fontSize: 32,
            }}
          >
            <HeaderLink
              href="/"
              onClick={(event) => handleInteractWithMenu({ event, path: "/" })}
            >
              {t("common:header_home")}
            </HeaderLink>
          </HeaderItem>
        </LeftContent>
        <HamburgerMenu
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        <HeaderUL role="list" mobileMenuOpen={mobileMenuOpen}>
          <HeaderItem
            aria-label={t("common:header_how_it_works")}
            onKeyDown={(event) =>
              event.key === "Enter" &&
              handleInteractWithMenu({ event, path: "/about" })
            }
            role="listitem"
            tabIndex={0}
          >
            <HeaderLink
              href="/about"
              onClick={(event) =>
                handleInteractWithMenu({ event, path: "/about" })
              }
            >
              {t("common:header_how_it_works")}
            </HeaderLink>
          </HeaderItem>
          {currentUser ? (
            <>
              <HeaderItem
                aria-label={t("common:header_my_vocab")}
                onKeyDown={(event) =>
                  event.key === "Enter" &&
                  handleInteractWithMenu({ event, path: "/my-vocab" })
                }
                role="listitem"
                tabIndex={0}
              >
                <HeaderLink
                  href="/my-vocab"
                  onClick={(event) =>
                    handleInteractWithMenu({ event, path: "/my-vocab" })
                  }
                >
                  {t("common:header_my_vocab")}
                </HeaderLink>
              </HeaderItem>
              <HeaderItem
                aria-label={t("common:header_add_words")}
                onKeyDown={(event) =>
                  event.key === "Enter" &&
                  handleInteractWithMenu({ event, path: "/add-words" })
                }
                role="listitem"
                tabIndex={0}
              >
                <HeaderLink
                  href="/add-words"
                  onClick={(event) =>
                    handleInteractWithMenu({ event, path: "/add-words" })
                  }
                >
                  {t("common:header_add_words")}
                </HeaderLink>
              </HeaderItem>
              <HeaderItem
                aria-label={t("common:header_profile")}
                onKeyDown={(event) =>
                  event.key === "Enter" &&
                  handleInteractWithMenu({ event, path: "/profile" })
                }
                role="listitem"
                tabIndex={0}
              >
                <HeaderLink
                  href="/profile"
                  onClick={(event) =>
                    handleInteractWithMenu({ event, path: "/profile" })
                  }
                >
                  {t("common:header_profile")}
                </HeaderLink>
              </HeaderItem>
              <MobileOnly>
                <HeaderItem>
                  <LanguageSelector
                    handleSelectLanguage={handleSelectInterfaceLanguage}
                    ref={languageSelectorRef}
                    selectedLanguage={
                      currentUser?.interfaceLanguage as InterfaceLanguages
                    }
                  />
                </HeaderItem>
              </MobileOnly>
              <HeaderItem
                aria-label={t("common:header_sign_out")}
                onKeyDown={(event) =>
                  event.key === "Enter" &&
                  handleInteractWithMenu({ event, path: "/", signOut: true })
                }
                role="listitem"
                tabIndex={0}
              >
                <HeaderLink
                  href="/"
                  onClick={(event) => {
                    event.preventDefault();
                    dispatch(signOutAuth(currentUser));
                    handleInteractWithMenu({ event, path: "/", signOut: true });
                  }}
                >
                  {t("common:header_sign_out")}
                </HeaderLink>
              </HeaderItem>
            </>
          ) : (
            <>
              <HeaderItem
                aria-label={t("common:sign_in")}
                onKeyDown={(event) =>
                  event.key === "Enter" &&
                  handleInteractWithMenu({ event, path: "/sign-in" })
                }
                role="listitem"
                tabIndex={0}
              >
                <HeaderLink
                  href="/sign-in"
                  onClick={(event) =>
                    handleInteractWithMenu({ event, path: "/sign-in" })
                  }
                >
                  {t("common:sign_in")}
                </HeaderLink>
              </HeaderItem>
              <MobileOnly>
                <HeaderItem>
                  <LanguageSelector
                    handleSelectLanguage={handleSelectInterfaceLanguage}
                    selectedLanguage={initialLanguage}
                  />
                </HeaderItem>
              </MobileOnly>
              <Button
                ariaLabel={t("common:sign_up")}
                onClick={() => router.push("/sign-up")}
                onKeyDown={(event) =>
                  event.key === "Enter" &&
                  handleInteractWithMenu({ event, path: "/sign-up" })
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
  alignItems: "center",
  gridArea: "1 / 1 / 2 / 9",
  padding: "8px",
  boxShadow: "0 1px 4px rgb(146 161 176 / 15%)",
});

const HeaderContent = styled.header({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  position: "relative",
  width: "100%",
});

const HeaderUL = styled.ul<{ mobileMenuOpen: boolean }>(
  ({ mobileMenuOpen }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    width: "fit-content",
    listStyle: "none",
    position: "absolute",
    zIndex: 3,
    top: "100%",
    right: 0,
    gap: "16px",
    padding: "16px",
    backgroundColor: theme.colors.white,
    boxShadow:
      "rgba(60, 64, 67, 0.05) 0px 1px 1px 0px, rgba(60, 64, 67, 0.05) 0px 1px 3px 1px",
    transform: mobileMenuOpen ? "translateY(0)" : "translateY(-10px)",
    transition: "transform 0.3s ease-in-out",
    opacity: mobileMenuOpen ? "1" : "0",
    visibility: mobileMenuOpen ? "visible" : "hidden",

    [`@media (min-width: ${theme.breakpoints.desktop})`]: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      gap: "24px",
      position: "static",
      boxShadow: "none",
      width: "100%",
      transform: "none",
      opacity: 1,
      visibility: "visible",
      padding: 0,
    },
  })
);

const HeaderItem = styled.li({
  display: "flex",
  alignItems: "center",
  fontWeight: "bold",
  fontSize: 14,
});

const HeaderLink = styled(Link)({
  textDecoration: "none",
  color: theme.colors.black,
  whiteSpace: "nowrap",

  "&:visited": { color: theme.colors.black },
  "&:active": {
    color: theme.colors.lightAvocado,
  },
  "&:hover": {
    color: theme.colors.lightAvocado,
  },
});

const LeftContent = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flex: 1,
});

const MobileOnly = styled.div({
  display: "block",

  [`@media (min-width: ${theme.breakpoints.desktop})`]: {
    display: "none",
  },
});
