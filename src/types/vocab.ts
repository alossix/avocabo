import { FieldValue } from "firebase/firestore";

export type Vocab = {
  category: string;
  createdAt: FieldValue;
  currentStep: CurrentStep;
  definition: string;
  description?: string;
  dueDate: string;
  emojiId: string;
  lastUpdatedAt: FieldValue;
  multiplier: StepMultiplier;
};

export type RecallDifficulty = "easy" | "medium" | "hard" | "forgot";

export type CurrentStep = number;

export type StepMultiplier = number;
