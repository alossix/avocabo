import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authSlice from "./slices/authSlice";
import interfaceLanguageSlice from "./slices/interfaceLanguageSlice";
import vocabSlice from "./slices/vocabSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    interfaceLanguage: interfaceLanguageSlice.reducer,
    vocab: vocabSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export const useAppDispatch: () => AppDispatch = useDispatch;
