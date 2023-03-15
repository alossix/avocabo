import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateUserAuth } from "@/store/slices/authSlice";
import { InterfaceLanguages } from "@/types/general";
import styled from "@emotion/styled";
import setLanguage from "next-translate/setLanguage";
import useTranslation from "next-translate/useTranslation";
import { useState } from "react";
import { LanguageSelector } from "../LanguageSelector";

export const Footer: React.FC = () => {
  const { lang } = useTranslation();
  const [interfaceLanguage, setInterfaceLanguage] =
    useState<InterfaceLanguages>(lang as InterfaceLanguages);
  const currentUser = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const handleSelectInterfaceLanguage = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newInterfaceLanguage = event.target.value as InterfaceLanguages;
    setInterfaceLanguage(newInterfaceLanguage);
    setLanguage(newInterfaceLanguage);

    if (currentUser) {
      // Update the user object in the Firebase store
      dispatch(updateUserAuth({ interfaceLanguage: newInterfaceLanguage }));
    }
  };

  return (
    <FooterContent>
      <p>Footer first</p>

      <LanguageSelector
        handleSelectLanguage={handleSelectInterfaceLanguage}
        selectedLanguage={interfaceLanguage}
      />
    </FooterContent>
  );
};

const FooterContent = styled.footer({
  display: "flex",
  justifyContent: "space-between",
  gridArea: "8 / 1 / 9 / 9",
  padding: 8,
  boxShadow: `rgba(60, 64, 67, 0.05) 0px -1px 1px 0px,
             rgba(60, 64, 67, 0.05) 0px -1px 3px 1px`,
});
