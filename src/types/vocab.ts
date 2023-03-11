export type Vocab = {
  category: string;
  createdAt: string;
  currentStep: CurrentStep;
  definition: string;
  description?: string;
  dueDate: string;
  emojiId: string;
  lastUpdatedAt: string;
  multiplier: StepMultiplier;
};

export type RecallDifficulty = "easy" | "medium" | "hard" | "forgot";

export type CurrentStep = number;

export type StepMultiplier = number;
