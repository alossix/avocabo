import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { RecallDifficulty, Vocab } from "@/types/vocab";

const initialState: Vocab[] = [
  {
    emojiId: "🌞",
    word: "the sun",
    currentStep: 0,
    multiplier: 1,
  },
  {
    emojiId: "🌧️",
    word: "the rain",
    currentStep: 0,
    multiplier: 1,
  },
  {
    emojiId: "\u{1F451}",
    word: "the crown",
    currentStep: 0,
    multiplier: 1,
  },
  {
    emojiId: "\u{1F452}",
    word: "the hat",
    currentStep: 0,
    multiplier: 1,
  },
  {
    emojiId: "\u{1F453}",
    word: "the glasses / the sunglasses",
    currentStep: 0,
    multiplier: 1,
  },
  {
    emojiId: "\u{1F454}",
    word: "the shirt",
    currentStep: 0,
    multiplier: 1,
  },
  {
    emojiId: "\u{1F455}",
    word: "the t-shirt",
    currentStep: 0,
    multiplier: 1,
  },
  {
    emojiId: "\u{1F456}",
    word: "the pants",
    currentStep: 0,
    multiplier: 1,
  },
];

export const vocabSlice = createSlice({
  name: "vocab",
  initialState,
  reducers: {
    changeVocabStep: (
      state,
      action: PayloadAction<{
        emojiId: string;
        recallDifficulty: RecallDifficulty;
      }>
    ) => {
      const { emojiId, recallDifficulty } = action.payload;
      const vocabIndex = state.findIndex((v) => v.emojiId === emojiId);

      if (recallDifficulty === "easy") {
        state[vocabIndex].currentStep += 2;
      } else if (recallDifficulty === "medium") {
        state[vocabIndex].currentStep += 1;
      } else if (recallDifficulty === "hard") {
        if (state[vocabIndex].currentStep === 0) {
          state[vocabIndex].currentStep = 0;
        } else {
          state[vocabIndex].currentStep = Math.max(
            Math.floor(state[vocabIndex].currentStep / 2),
            1
          );
        }
      } else if (recallDifficulty === "forgot") {
        state[vocabIndex].currentStep = 0;
      }
    },

    // increaseVocabMultiplier: (
    //   state,
    //   action: PayloadAction<{ emojiId: string; multiplier: number }>
    // ) => {
    //   const { emojiId, multiplier } = action.payload;
    //   const vocabIndex = state.findIndex((v) => v.emojiId === emojiId);
    //   state[vocabIndex].multiplier += multiplier;
    // },
    // decreaseVocabMultiplier: (
    //   state,
    //   action: PayloadAction<{ emojiId: string; multiplier: number }>
    // ) => {
    //   const { emojiId, multiplier } = action.payload;
    //   const vocabIndex = state.findIndex((v) => v.emojiId === emojiId);
    //   state[vocabIndex].multiplier -= multiplier;
    // },
  },
});

export const {
  changeVocabStep,
  // increaseVocabMultiplier,
  // decreaseVocabMultiplier,
} = vocabSlice.actions;

export const currentStepSelector = (state: RootState) => state.vocab;

export default vocabSlice;
