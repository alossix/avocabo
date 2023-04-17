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

interface SetInitialStateAction extends Action {
  payload: RootState;
}

export const rootReducer = (
  state: RootState | undefined,
  action: Action
): RootState => {
  if ((action as SetInitialStateAction).type === "SET_INITIAL_STATE") {
    return (action as SetInitialStateAction).payload;
  }

  return {
    auth: authSlice.reducer(state?.auth, action),
    interfaceLanguage: interfaceLanguageSlice.reducer(
      state?.interfaceLanguage,
      action
    ),
    vocab: vocabSlice.reducer(state?.vocab, action),
  };
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export const useAppDispatch: () => AppDispatch = useDispatch;
