import { AppUser } from "@/types/general";
import { Vocab } from "@/types/vocab";

const newDate = new Date().toISOString();

export const mockVocabEntry: Vocab = {
  blackoutWords: [],
  category: "noun",
  createdAt: newDate,
  currentBox: 1,
  definition: "hat",
  description: "a representative hat",
  dueDate: newDate,
  imageURL: "http://localhost:3000/image123.jpg",
  lastUpdatedAt: newDate,
  phoneticPronunciation: "",
  vocabId: "123",
};

export const mockVocabList: { [vocabId: string]: Vocab } = {
  "124": {
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
  "125": {
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
  "126": {
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
};

export const mockUser: AppUser = {
  email: "testuser@example.com",
  displayName: "Test User",
  uid: "abc123",
  emailVerified: true,
  interfaceLanguage: "en",
  learningLanguage: "es",
  userCreatedDate: new Date(),
  userLastSignIn: new Date(),
};
