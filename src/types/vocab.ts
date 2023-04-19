export type Vocab = {
  blackout?: {
    beginning: number;
    end: number;
  };
  currentBox: number;
  category: VocabCategories;
  createdAt: string;
  definition: string;
  description?: string;
  dueDate: string;
  imageURL: string;
  lastUpdatedAt: string;
  phoneticPronunciation: string;
  vocabId: string;
};

export type VocabCategories =
  | "noun"
  | "verb"
  | "adverb"
  | "adjective"
  | "phrase"
  | "pronoun"
  | "preposition"
  | "conjunction"
  | "other"
  | "";

export type RecallDifficulty = "easy" | "medium" | "hard" | "forgot";
