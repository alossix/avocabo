export type Vocab = {
  currentBox: number;
  category: VocabCategories;
  createdAt: string;
  definition: string;
  description?: string;
  dueDate: string;
  imageURL: string;
  lastUpdatedAt: string;
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
