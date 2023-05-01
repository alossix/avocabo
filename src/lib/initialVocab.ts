import { Vocab } from "@/types/vocab";

const currentDate = new Date().toISOString();

export const initialVocabProperties: Omit<
  Vocab,
  "category" | "definition" | "imageURL" | "vocabId"
> = {
  createdAt: currentDate,
  currentBox: 0,
  dueDate: currentDate,
  lastUpdatedAt: currentDate,
  phoneticPronunciation: "",
};
