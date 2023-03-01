import { configureStore } from "@reduxjs/toolkit";
import vocabSlice from "./vocabSlice";

export const store = configureStore({
  reducer: {
    vocab: vocabSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
