import { RecallDifficulty, Vocab } from "@/types/vocab";

const compareDatesWithoutTime = (date1: Date, date2: Date) => {
  const year1 = date1.getFullYear();
  const month1 = date1.getMonth();
  const day1 = date1.getDate();

  const year2 = date2.getFullYear();
  const month2 = date2.getMonth();
  const day2 = date2.getDate();

  if (year1 === year2 && month1 === month2 && day1 === day2) {
    return 0;
  }
  return date1 < date2 ? -1 : 1;
};

export const getUpdatedDueDate = (dueDate: string) => {
  const currentDate = new Date();
  const vocabDueDate = new Date(dueDate);

  if (compareDatesWithoutTime(vocabDueDate, currentDate) === -1) {
    const updatedDate = new Date(currentDate);
    updatedDate.setHours(0, 0, 0, 0);
    return updatedDate.toISOString();
  }

  return dueDate;
};

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
        new Date(dueDate).getTime() + currentBox * DAY_IN_MS
      ).toISOString();
    case "medium":
      return new Date(
        new Date(dueDate).getTime() + (currentBox / 1.5) * DAY_IN_MS
      ).toISOString();
    case "hard":
      return new Date(
        new Date(dueDate).getTime() + (currentBox * DAY_IN_MS) / 2
      ).toISOString();
    case "forgot":
      return new Date().toISOString();
  }
};
