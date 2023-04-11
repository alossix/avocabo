import { newShortDate } from "@/lib/datesAndTimes";
import { handleAppError } from "@/lib/handleAppError";
import {
  getDownloadURL,
  ref,
  storage,
  uploadBytes,
} from "@/services/firebase/firebaseService";
import { RootState } from "@/store/store";
import { AppUser } from "@/types/general";
import { RecallDifficulty, Vocab } from "@/types/vocab";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { UseFormSetValue } from "react-hook-form";
import { setAppError } from "../authSlice";
import { resizeImage } from "@/lib/resizeImages";

const compareDatesWithoutTime = (date1: string, date2: string) => {
  const [year1, month1, day1] = date1.split("-").map(Number);
  const [year2, month2, day2] = date2.split("-").map(Number);

  if (year1 === year2 && month1 === month2 && day1 === day2) {
    return 0;
  }
  return date1 < date2 ? -1 : 1;
};

export const getUpdatedDueDate = (dueDate: string) => {
  const currentDate = newShortDate();

  if (compareDatesWithoutTime(dueDate, currentDate) === -1) {
    return currentDate;
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
  const MINUTE_IN_MS = 60000;

  const newDueDate = (multiplier: number) => {
    const newDate = new Date(
      new Date(dueDate).getTime() + multiplier * DAY_IN_MS
    );
    newDate.setHours(0, 0, 0, 0);
    return newDate.toISOString();
  };

  switch (recallDifficulty) {
    case "easy":
      if (currentBox === 0) {
        return new Date(
          new Date(dueDate).getTime() + 45 * MINUTE_IN_MS
        ).toISOString();
      } else {
        return newDueDate(currentBox);
      }
    case "medium":
      if (currentBox === 0) {
        return new Date(
          new Date(dueDate).getTime() + 20 * MINUTE_IN_MS
        ).toISOString();
      } else {
        return newDueDate(currentBox / 1.5);
      }
    case "hard":
      if (currentBox === 0) {
        return new Date(
          new Date(dueDate).getTime() + 5 * MINUTE_IN_MS
        ).toISOString();
      } else {
        return newDueDate(currentBox / 2);
      }
    case "forgot":
      return new Date(new Date().getTime() + MINUTE_IN_MS / 2).toISOString();
  }
};

export const uploadVocabImage = async ({
  currentUser,
  dispatch,
  event,
  setValue,
  vocabId,
}: {
  currentUser: AppUser | null;
  dispatch: ThunkDispatch<RootState, undefined, AnyAction>;
  event: React.ChangeEvent<HTMLInputElement>;
  setValue: UseFormSetValue<Vocab>;
  vocabId: string;
}) => {
  if (!currentUser) return null;

  if (event.target.files && event.target.files[0]) {
    const file = event.target.files[0];
    const fileRef = ref(storage, `users/${currentUser?.uid}/images/${vocabId}`);

    try {
      // Resize the image before uploading
      const resizedImageBlob = await resizeImage(file, 800, 800);

      // Upload the resized image to Firebase Storage
      await uploadBytes(fileRef, resizedImageBlob);

      // Get the download URL and set it as imageURL in the form
      const imageURL = await getDownloadURL(fileRef);

      setValue("imageURL", imageURL); // setValue is provided by useForm

      return imageURL;
    } catch (error: unknown) {
      const { message } = handleAppError(error);
      dispatch(setAppError(message));
    }
  }
};
