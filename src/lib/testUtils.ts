import { Vocab } from "@/types/vocab";

const newDate = new Date().toISOString();

export const mockVocabEntry: Vocab = {
  vocabId: "123",
  definition: "hat",
  description: "a representative hat",
  currentBox: 1,
  createdAt: newDate,
  category: "noun",
  dueDate: newDate,
  imageURL: "http://localhost:3000/image123.jpg",
  lastUpdatedAt: newDate,
  phoneticPronunciation: "",
};

export const mockVocabList: Vocab[] = [
  {
    vocabId: "124",
    definition: "chair",
    description: "a representative chair",
    currentBox: 3,
    createdAt: newDate,
    category: "noun",
    dueDate: newDate,
    imageURL: "http://localhost:3000/image124.jpg",
    lastUpdatedAt: newDate,
    phoneticPronunciation: "",
  },
  {
    vocabId: "125",
    definition: "desk",
    description: "a representative desk",
    currentBox: 5,
    createdAt: newDate,
    category: "noun",
    dueDate: newDate,
    imageURL: "http://localhost:3000/image125.jpg",
    lastUpdatedAt: newDate,
    phoneticPronunciation: "",
  },
  {
    vocabId: "126",
    definition: "door",
    description: "a representative door",
    currentBox: 7,
    createdAt: newDate,
    category: "noun",
    dueDate: newDate,
    imageURL: "http://localhost:3000/image126.jpg",
    lastUpdatedAt: newDate,
    phoneticPronunciation: "",
  },
];
