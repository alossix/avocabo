import useUserCookie from "@/hooks/useUserCookie";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateUserAuth } from "@/store/slices/authSlice";
import { setInterfaceLanguage } from "@/store/slices/interfaceLanguageSlice";
import { theme } from "@/styles/theme";
import { InterfaceLanguages } from "@/types/general";
import styled from "@emotion/styled";
import setLanguage from "next-translate/setLanguage";
import useTranslation from "next-translate/useTranslation";
import { LanguageSelector } from "../../Forms/LanguageSelector";

export const Footer: React.FC = () => {
  const { lang } = useTranslation();
  const { getUserCookie, setUserCookie } = useUserCookie();
  const currentUser = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const userCookie = getUserCookie();

  const handleSelectInterfaceLanguage = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newInterfaceLanguage = event.target.value as InterfaceLanguages;
    // set language in next-translate context
    setLanguage(newInterfaceLanguage);

    const updatedUserCookie = {
      ...userCookie,
      interfaceLanguage: newInterfaceLanguage,
    };
    setUserCookie(updatedUserCookie);

    if (currentUser) {
      // update user object in both firebase and local state
      dispatch(updateUserAuth({ interfaceLanguage: newInterfaceLanguage }));
    } else {
      // no user logged in, set a new local state only
      dispatch(setInterfaceLanguage(newInterfaceLanguage));
    }
  };

  return (
    <FooterNav>
      <FooterContent>
        <LanguageSelector
          handleSelectLanguage={handleSelectInterfaceLanguage}
          languageSet={"interface"}
          selectedLanguage={
            userCookie?.interfaceLanguage ??
            currentUser?.interfaceLanguage ??
            (lang as InterfaceLanguages)
          }
        />
      </FooterContent>
    </FooterNav>
  );
};

const FooterNav = styled.footer({
  display: "none",
  justifyContent: "flex-end",
  gridArea: "8 / 1 / 9 / 9",
  backgroundColor: theme.colors.white,
  zIndex: 999,
  boxShadow:
    "rgba(60, 64, 67, 0.05) 0px -1px 1px 0px, rgba(60, 64, 67, 0.05) 0px -1px 3px 1px",

  [`@media (min-width: ${theme.breakpoints.desktop})`]: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
});

const FooterContent = styled.div({
  display: "flex",
  justifyContent: "flex-end",
  width: "100%",
  maxWidth: 1024,
  padding: 8,
});
