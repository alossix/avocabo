import { v4 as uuid4 } from "uuid";
const currentDate = new Date().toISOString();

export const initialVocabProperties: Omit<
  Vocab,
  "emojiId" | "definition" | "vocabId"
> = {
  category: "",
  currentStep: 0,
  multiplier: 1,
  createdAt: currentDate,
  lastUpdatedAt: currentDate,
  dueDate: currentDate,
};

import { Vocab } from "@/types/vocab";

export const initialVocab: Vocab[] = [
  {
    emojiId: "🌞",
    definition: "the sun",
    vocabId: uuid4(),
    ...initialVocabProperties,
  },
  {
    emojiId: "🌧️",
    definition: "the rain",
    vocabId: uuid4(),
    ...initialVocabProperties,
  },
  {
    emojiId: "\u{1F451}",
    definition: "the crown",
    vocabId: uuid4(),
    ...initialVocabProperties,
  },
  {
    emojiId: "\u{1F452}",
    definition: "the hat",
    vocabId: uuid4(),
    ...initialVocabProperties,
  },
  {
    emojiId: "\u{1F453}",
    definition: "the glasses / the sunglasses",
    vocabId: uuid4(),
    ...initialVocabProperties,
  },
  {
    emojiId: "\u{1F454}",
    definition: "the shirt",
    vocabId: uuid4(),
    ...initialVocabProperties,
  },
  {
    emojiId: "\u{1F455}",
    definition: "the t-shirt",
    vocabId: uuid4(),
    ...initialVocabProperties,
  },
  {
    emojiId: "\u{1F456}",
    definition: "the pants",
    vocabId: uuid4(),
    ...initialVocabProperties,
  },
];
