import { Vocab } from "@/types/vocab";

const newDate = new Date().toISOString();

export const mockVocabEntry: Vocab = {
  vocabId: "123",
  definition: "example",
  description: "a representative example",
  currentBox: 1,
  createdAt: newDate,
  category: "noun",
  dueDate: newDate,
  imageURL: "http://localhost:3000/image.jpg",
  lastUpdatedAt: newDate,
  phoneticPronunciation: "",
};
