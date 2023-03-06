import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authSlice from "./authSlice";
import vocabSlice from "./vocabSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    vocab: vocabSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export const useAppDispatch = () => useDispatch();
