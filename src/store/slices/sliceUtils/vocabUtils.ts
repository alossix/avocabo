import { RecallDifficulty, Vocab } from "@/types/vocab";

export const boxIntervals = [
  0, 1, 2, 3, 7, 9, 14, 24, 30, 45, 60, 90, 120, 180, 365,
];

export const updateVocabCurrentBox = ({
  currentBox,
  recallDifficulty,
}: {
  currentBox: number;
  recallDifficulty: RecallDifficulty;
}): number => {
  if (currentBox === 0 && recallDifficulty === "easy") {
    return 1;
  }

  switch (recallDifficulty) {
    case "easy":
      return currentBox === boxIntervals.length - 1
        ? currentBox
        : currentBox + 2;
    case "medium":
      return currentBox === boxIntervals.length - 1
        ? currentBox
        : currentBox + 1;
    case "hard":
      if (currentBox === 0) {
        return 0;
      } else {
        return currentBox > 3 ? Math.ceil(currentBox / 2) : currentBox - 1;
      }
    case "forgot":
      return 0;
    default:
      return currentBox;
  }
};

export const updateVocabDueDate = ({
  vocab,
  recallDifficulty,
}: {
  vocab: Vocab;
  recallDifficulty: RecallDifficulty;
}) => {
  const DAY_IN_MS = 86400000;
  const index =
    vocab.box < boxIntervals.length ? vocab.box : boxIntervals.length - 1;
  const interval = boxIntervals[index];
  let newDueDate;

  if (vocab.box === boxIntervals.length - 1 && recallDifficulty === "easy") {
    newDueDate = new Date(
      new Date(vocab.dueDate).getTime() + 365 * DAY_IN_MS
    ).toISOString();
  } else if (vocab.box >= boxIntervals.length - 1) {
    newDueDate = new Date(
      new Date(vocab.dueDate).getTime() + interval * DAY_IN_MS
    ).toISOString();
  } else {
    newDueDate = new Date(Date.now() + interval * DAY_IN_MS).toISOString();
  }
  return newDueDate;
};
