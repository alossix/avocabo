import { RecallDifficulty, Vocab } from "@/types/vocab";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "./store";

const currentDate = new Date().toISOString();

const initialProperties: Omit<Vocab, "emojiId" | "definition"> = {
  category: "",
  currentStep: 0,
  multiplier: 1,
  createdAt: currentDate,
  lastUpdatedAt: currentDate,
  dueDate: currentDate,
};

const initialState: Vocab[] = [
  {
    emojiId: "🌞",
    definition: "the sun",
    ...initialProperties,
  },
  {
    emojiId: "🌧️",
    definition: "the rain",
    ...initialProperties,
  },
  {
    emojiId: "\u{1F451}",
    definition: "the crown",
    ...initialProperties,
  },
  {
    emojiId: "\u{1F452}",
    definition: "the hat",
    ...initialProperties,
  },
  {
    emojiId: "\u{1F453}",
    definition: "the glasses / the sunglasses",
    ...initialProperties,
  },
  {
    emojiId: "\u{1F454}",
    definition: "the shirt",
    ...initialProperties,
  },
  {
    emojiId: "\u{1F455}",
    definition: "the t-shirt",
    ...initialProperties,
  },
  {
    emojiId: "\u{1F456}",
    definition: "the pants",
    ...initialProperties,
  },
];

export const vocabSlice = createSlice({
  name: "vocab",
  initialState,
  reducers: {
    addVocabEntry: addVocabEntryReducer,
    changeVocabStep: changeVocabStepReducer,
    removeVocabEntry: removeVocabEntryReducer,
  },
});

function addVocabEntryReducer(
  vocabState: Vocab[],
  action: PayloadAction<Vocab>
) {
  const newEntry: Vocab = {
    ...action.payload,
    ...initialProperties,
  };
  vocabState.push(newEntry);
}

function changeVocabStepReducer(
  vocabState: Vocab[],
  action: PayloadAction<{ emojiId: string; recallDifficulty: RecallDifficulty }>
) {
  const { emojiId, recallDifficulty } = action.payload;
  const vocabIndex = vocabState.findIndex((v) => v.emojiId === emojiId);
  const vocab = vocabState[vocabIndex];

  if (recallDifficulty === "easy") {
    vocab.currentStep += 2;
  } else if (recallDifficulty === "medium") {
    vocab.currentStep += 1;
  } else if (recallDifficulty === "hard") {
    if (vocab.currentStep === 0) {
      vocab.currentStep = 0;
    } else {
      vocab.currentStep = Math.max(Math.floor(vocab.currentStep / 2), 1);
    }
  } else if (recallDifficulty === "forgot") {
    vocab.currentStep = 0;
  }

  vocab.dueDate = new Date(
    Date.now() + vocab.currentStep * 86400000
  ).toISOString();
}

function removeVocabEntryReducer(
  vocabState: Vocab[],
  action: PayloadAction<{ emojiId: string }>
) {
  const { emojiId } = action.payload;
  const index = vocabState.findIndex(
    (vocabState) => vocabState.emojiId === emojiId
  );

  if (index !== -1) {
    vocabState.splice(index, 1);
  }
}

export const { addVocabEntry, changeVocabStep, removeVocabEntry } =
  vocabSlice.actions;

export const vocabSelector = (state: RootState) => state.vocab;

export default vocabSlice;
