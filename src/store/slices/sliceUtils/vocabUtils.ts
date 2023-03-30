import { RecallDifficulty, Vocab } from "@/types/vocab";

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
      return currentBox + 2;
    case "medium":
      return currentBox + 1;
    case "hard":
      if (currentBox === 0) {
        return 0;
      } else {
        return currentBox > 3 ? Math.ceil(currentBox / 2) : currentBox - 1;
      }
    case "forgot":
      return 0;
  }
};

export const updateVocabDueDate = ({
  vocab,
  recallDifficulty,
}: {
  vocab: Vocab;
  recallDifficulty: RecallDifficulty;
}) => {
  const { currentBox, dueDate } = vocab;
  const DAY_IN_MS = 86400000;

  switch (recallDifficulty) {
    case "easy":
      return new Date(
        new Date(dueDate).getTime() + currentBox * DAY_IN_MS * 2
      ).toISOString();
    case "medium":
      return new Date(
        new Date(dueDate).getTime() + currentBox * DAY_IN_MS
      ).toISOString();
    case "hard":
      return new Date(
        new Date(dueDate).getTime() + (currentBox * DAY_IN_MS) / 2
      ).toISOString();
    case "forgot":
      return new Date().toISOString();
  }
};
