export type Vocab = {
  category: VocabCategories;
  createdAt: string;
  currentStep: CurrentStep;
  definition: string;
  description?: string;
  dueDate: string;
  emojiId: string;
  lastUpdatedAt: string;
  multiplier: StepMultiplier;
  vocabId: string;
};

type VocabCategories =
  | "noun"
  | "verb"
  | "adverb"
  | "adjective"
  | "phrase"
  | "pronoun"
  | "preposition"
  | "conjunction"
  | "other";

export type RecallDifficulty = "easy" | "medium" | "hard" | "forgot";

export type CurrentStep = number;

export type StepMultiplier = number;
