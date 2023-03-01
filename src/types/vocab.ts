export type Vocab = {
  emojiId: string;
  word: string;
  currentStep: CurrentStep;
  multiplier: StepMultiplier;
};

export type RecallDifficulty = "easy" | "medium" | "hard" | "forgot";

export type CurrentStep = number;

export type StepMultiplier = number;
