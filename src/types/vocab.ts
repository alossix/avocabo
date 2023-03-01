export type Vocab = {
  emojiId: string;
  word: string;
  currentStep: CurrentStep;
  multiplier: StepMultiplier;
};

export type Ease = {
  ease: "easy" | "medium" | "difficult";
};

export type CurrentStep = number;

export type StepMultiplier = number;
