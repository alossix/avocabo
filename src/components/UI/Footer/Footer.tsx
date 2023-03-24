import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateUserAuth } from "@/store/slices/authSlice";
import { setInterfaceLanguage } from "@/store/slices/interfaceLanguageSlice";
import { theme } from "@/styles/theme";
import { InterfaceLanguages } from "@/types/general";
import styled from "@emotion/styled";
import setLanguage from "next-translate/setLanguage";
import { LanguageSelector } from "../../LanguageSelector";

export const Footer: React.FC = () => {
  const currentUser = useAppSelector((state) => state.auth.user);
  const initialLanguage = useAppSelector(
    (state) => state.interfaceLanguage.interfaceLanguage
  );
  const dispatch = useAppDispatch();

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

  return (
    <FooterContent>
      <LanguageSelector
        handleSelectLanguage={handleSelectInterfaceLanguage}
        selectedLanguage={
          currentUser ? currentUser.interfaceLanguage : initialLanguage
        }
      />
    </FooterContent>
  );
};

const FooterContent = styled.footer({
  display: "none",
  justifyContent: "flex-end",
  gridArea: "8 / 1 / 9 / 9",
  padding: 8,
  boxShadow:
    "rgba(60, 64, 67, 0.05) 0px -1px 1px 0px, rgba(60, 64, 67, 0.05) 0px -1px 3px 1px",

  [`@media (min-width: ${theme.breakpoints.desktop})`]: {
    display: "flex",
  },
});
