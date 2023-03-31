import { InterfaceLanguages } from "@/types/general";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type LanguageMapping = {
  [K in InterfaceLanguages]: K;
};

const languageMapping: LanguageMapping = {
  ca: "ca",
  en: "en",
  es: "es",
  fr: "fr",
  it: "it",
  nl: "nl",
};

const interfaceLanguages = (
  Object.keys(languageMapping) as Array<keyof LanguageMapping>
).map((key) => languageMapping[key]);

const getInitialInterfaceLanguage = (): InterfaceLanguages => {
  if (typeof window !== "undefined") {
    const storedLanguage = localStorage.getItem("interfaceLanguage");
    if (
      storedLanguage &&
      Object.values(interfaceLanguages).includes(
        storedLanguage as InterfaceLanguages
      )
    ) {
      return storedLanguage as InterfaceLanguages;
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
