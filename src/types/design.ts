import { RecallDifficulty } from "./vocab";

export type StepperColorNames =
  | "easyGreen"
  | "mediumOrange"
  | "hardRed"
  | "forgotPurple";

export type StepperColors = Record<RecallDifficulty, StepperColorNames>;
