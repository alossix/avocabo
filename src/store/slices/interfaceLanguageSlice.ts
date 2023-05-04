import { InterfaceLanguages } from "@/types/general";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

type LanguageMapping = {
  [K in InterfaceLanguages]: K;
};

const languageMapping: LanguageMapping = {
  ca: "ca",
  de: "de",
  en: "en",
  es: "es",
  fr: "fr",
  it: "it",
  nl: "nl",
  uk: "uk",
};

const interfaceLanguages = (
  Object.keys(languageMapping) as Array<keyof LanguageMapping>
).map((key) => languageMapping[key]);

const getInitialInterfaceLanguage = (): InterfaceLanguages => {
  if (typeof window !== "undefined") {
    // get the interfaceLanguage from the user cookie
    const userCookie = Cookies.get("currentUser");

    if (userCookie) {
      const { interfaceLanguage } = JSON.parse(userCookie);
      if (interfaceLanguage && interfaceLanguages.includes(interfaceLanguage)) {
        return interfaceLanguage;
      }
    }
  }

  return "en";
};

const initialState = {
  interfaceLanguage: getInitialInterfaceLanguage(),
};

const interfaceLanguageSlice = createSlice({
  name: "interfaceLanguage",
  initialState,
  reducers: {
    setInterfaceLanguage: (
      state,
      action: PayloadAction<InterfaceLanguages>
    ) => {
      state.interfaceLanguage = action.payload;
    },
  },
});

export const { setInterfaceLanguage } = interfaceLanguageSlice.actions;

export default interfaceLanguageSlice;
