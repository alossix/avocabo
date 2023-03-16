import { InterfaceLanguages } from "@/types/general";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const getInitialInterfaceLanguage = (): InterfaceLanguages => {
  const interfaceLanguages: InterfaceLanguages[] = [
    "ct",
    "en",
    "es",
    "it",
    "nl",
  ];

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
