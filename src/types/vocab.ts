export type Vocab = {
  emojiId: string;
  definition: string;
  description?: string;
  currentStep: CurrentStep;
  multiplier: StepMultiplier;
  createdAt: string;
  lastUpdatedAt: string;
};

export type RecallDifficulty = "easy" | "medium" | "hard" | "forgot";

export type CurrentStep = number;

export type StepMultiplier = number;
