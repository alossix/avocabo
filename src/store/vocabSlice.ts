import { RecallDifficulty, Vocab } from "@/types/vocab";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

const createdAtDate = new Date().toISOString();

const initialState: Vocab[] = [
  {
    emojiId: "🌞",
    definition: "the sun",
    currentStep: 0,
    multiplier: 1,
    createdAt: createdAtDate,
    lastUpdatedAt: createdAtDate,
  },
  {
    emojiId: "🌧️",
    definition: "the rain",
    currentStep: 0,
    multiplier: 1,
    createdAt: createdAtDate,
    lastUpdatedAt: createdAtDate,
  },
  {
    emojiId: "\u{1F451}",
    definition: "the crown",
    currentStep: 0,
    multiplier: 1,
    createdAt: createdAtDate,
    lastUpdatedAt: createdAtDate,
  },
  {
    emojiId: "\u{1F452}",
    definition: "the hat",
    currentStep: 0,
    multiplier: 1,
    createdAt: createdAtDate,
    lastUpdatedAt: createdAtDate,
  },
  {
    emojiId: "\u{1F453}",
    definition: "the glasses / the sunglasses",
    currentStep: 0,
    multiplier: 1,
    createdAt: createdAtDate,
    lastUpdatedAt: createdAtDate,
  },
  {
    emojiId: "\u{1F454}",
    definition: "the shirt",
    currentStep: 0,
    multiplier: 1,
    createdAt: createdAtDate,
    lastUpdatedAt: createdAtDate,
  },
  {
    emojiId: "\u{1F455}",
    definition: "the t-shirt",
    currentStep: 0,
    multiplier: 1,
    createdAt: createdAtDate,
    lastUpdatedAt: createdAtDate,
  },
  {
    emojiId: "\u{1F456}",
    definition: "the pants",
    currentStep: 0,
    multiplier: 1,
    createdAt: createdAtDate,
    lastUpdatedAt: createdAtDate,
  },
];

export const vocabSlice = createSlice({
  name: "vocab",
  initialState,
  reducers: {
    addVocabEntry: (state, action: PayloadAction<Vocab>) => {
      const newEntry = {
        ...action.payload,
        currentStep: 0,
        multiplier: 1,
        createdAt: new Date().toISOString(),
        lastUpdatedAt: new Date().toISOString(),
      };
      state.push(newEntry);
    },
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
    removeVocabEntry: (state, action: PayloadAction<{ emojiId: string }>) => {
      const { emojiId } = action.payload;
      const index = state.findIndex((vocab) => vocab.emojiId === emojiId);

      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { addVocabEntry, changeVocabStep, removeVocabEntry } =
  vocabSlice.actions;

export const currentStepSelector = (state: RootState) => state.vocab;

export default vocabSlice;
