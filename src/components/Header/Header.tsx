import { auth, onAuthStateChanged } from "@/services/firebase/firebaseService";
import { signOutAuth } from "@/store/slices/authSlice";
import { AppDispatch, useAppDispatch } from "@/store/store";
import { theme } from "@/styles/theme";
import styled from "@emotion/styled";
import { User } from "firebase/auth";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Button } from "../Button";

export const Header: React.FC = () => {
  const { t } = useTranslation("common");
  const dispatch: AppDispatch = useAppDispatch();
  const router = useRouter();
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    if (signOut) {
      dispatch(signOutAuth());
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
      !headerRef.current.querySelector("header")?.contains(event.target as Node)
    ) {
      setMobileMenuOpen(false);
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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileMenuOpen]);

  return (
    <HeaderNav ref={headerRef}>
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
      <HeaderContent
        onClick={() => {
          if (mobileMenuOpen) {
            setMobileMenuOpen(false);
          }
        }}
      >
        <Checkbox
          type="checkbox"
          onChange={() => setMobileMenuOpen(!mobileMenuOpen)}
        />
        <HamburgerLines>
          <Line mobileMenuOpen={mobileMenuOpen} className="line1" />
          <Line mobileMenuOpen={mobileMenuOpen} className="line2" />
          <Line mobileMenuOpen={mobileMenuOpen} className="line3" />
        </HamburgerLines>
        <HeaderUL role="list" mobileMenuOpen={mobileMenuOpen}>
          <HeaderItem
            aria-label={t("common:header_how_it_works")}
            onKeyDown={(event) =>
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
                aria-label={t("common:header_dashboard")}
                onKeyDown={(event) =>
                  handleInteractWithMenu({ event, path: "/dashboard" })
                }
                role="listitem"
                tabIndex={0}
              >
                <HeaderLink
                  href="/dashboard"
                  onClick={(event) =>
                    handleInteractWithMenu({ event, path: "/dashboard" })
                  }
                >
                  {t("common:header_dashboard")}
                </HeaderLink>
              </HeaderItem>
              <HeaderItem
                aria-label={t("common:header_sign_out")}
                onKeyDown={(event) =>
                  handleInteractWithMenu({ event, path: "/", signOut: true })
                }
                role="listitem"
                tabIndex={0}
              >
                <HeaderLink
                  href="/"
                  onClick={(event) => {
                    event.preventDefault();
                    dispatch(signOutAuth());
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
              <Button
                ariaLabel={t("common:sign_up")}
                onClick={() => router.push("/sign-up")}
                onKeyDown={(event) =>
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

const HeaderNav = styled.nav`
  display: flex;
  justify-content: space-between;
  grid-area: 1 / 1 / 2 / 9;
  padding: 8px;
  box-shadow: 0 1px 4px rgb(146 161 176 / 15%);
`;

const HeaderContent = styled.header`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
`;

const LeftContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;

const Checkbox = styled.input`
  position: absolute;
  display: block;
  height: 32px;
  width: 32px;
  right: 0;
  z-index: 5;
  opacity: 0;
  cursor: pointer;
`;

const HeaderUL = styled.ul<{ mobileMenuOpen: boolean }>`
  display: ${(props) => (props.mobileMenuOpen ? "flex" : "none")};
  flex-direction: column;
  align-items: flex-end;
  width: fit-content;
  list-style: none;
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0;
  background-color: ${theme.colors.white};
  box-shadow: rgba(60, 64, 67, 0.05) 0px 1px 1px 0px,
    rgba(60, 64, 67, 0.05) 0px 1px 3px 1px;
  transform: ${(props) =>
    props.mobileMenuOpen ? "translateX(0)" : "translate(-150%)"};
  transition: transform 0.4s ease-in-out;

  @media (min-width: ${theme.breakpoints.desktop}) {
    display: flex;
    flex-direction: row;
    position: static;
    justify-content: flex-end;
    box-shadow: none;
    align-items: center;
    width: 100%;
    gap: 48px;
  }
`;

const HeaderItem = styled.li({
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

const HamburgerLines = styled.div`
  display: block;
  flex-direction: column;
  justify-content: space-between;
  height: 26px;
  width: 32px;
  position: absolute;
  right: 0;
  z-index: 2;
  display: flex;
  cursor: pointer;
`;

const Line = styled.span<{ mobileMenuOpen: boolean }>`
  display: block;
  height: 4px;
  width: 100%;
  border-radius: 10px;
  background: ${theme.colors.black};

  &.line1 {
    transform-origin: 0% 0%;
    transition: transform 0.4s ease-in-out;
    transform: ${(props) => (props.mobileMenuOpen ? "rotate(45deg)" : "none")};
  }

  &.line2 {
    transition: transform 0.3s ease-in-out, opacity 0.2s ease-in-out;
    transform: ${(props) =>
      props.mobileMenuOpen ? "translateX(-10%)" : "none"};
    opacity: ${(props) => (props.mobileMenuOpen ? "0" : "1")};
  }

  &.line3 {
    transform-origin: 0% 100%;
    transition: transform 0.4s ease-in-out;
    transform: ${(props) => (props.mobileMenuOpen ? "rotate(-45deg)" : "none")};
  }
`;
