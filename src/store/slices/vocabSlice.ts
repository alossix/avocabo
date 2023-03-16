import { handleFirebaseError } from "@/lib/firebaseError";
import {
  auth,
  collection,
  db,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
} from "@/services/firebase/firebaseService";
import { RecallDifficulty, Vocab } from "@/types/vocab";
import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { AppThunk, RootState } from "../store";
import { setAppError } from "./authSlice";

const initialState: Vocab[] = [];

const boxIntervals = [
  0, 1, 2, 3, 5, 7, 9, 11, 14, 24, 30, 45, 60, 75, 90, 120, 180, 365,
];

export const vocabSlice = createSlice({
  name: "vocab",
  initialState,
  reducers: {
    addVocabEntryInState: (state, action: PayloadAction<Vocab>) => {
      state.push(action.payload);
    },
    changeVocabBoxInState: (
      state,
      action: PayloadAction<{
        vocabId: string;
        recallDifficulty: RecallDifficulty;
      }>
    ) => {
      const { vocabId, recallDifficulty } = action.payload;

      const vocab = state.find((vocab) => vocab.vocabId === vocabId);

      if (vocab) {
        vocab.box = updateVocabCurrentBox(vocab.box, recallDifficulty);
        vocab.dueDate = updateVocabDueDate(vocab, recallDifficulty);
        vocab.lastUpdatedAt = new Date().toISOString();
      }
    },
    removeVocabEntryInState: (
      state,
      action: PayloadAction<{ vocabId: string }>
    ) => {
      const { vocabId } = action.payload;
      const vocabIndex = state.findIndex((v) => v.vocabId === vocabId);

      if (vocabIndex !== -1) {
        state.splice(vocabIndex, 1);
      }
    },
    setVocabInState: (state, action: PayloadAction<Vocab[]>) => {
      return action.payload;
    },
    updateVocabEntryInState: (state, action: PayloadAction<Vocab>) => {
      const { vocabId } = action.payload;
      const vocabIndex = state.findIndex((v) => v.vocabId === vocabId);
      state[vocabIndex] = action.payload;
    },
  },
});

const getUserVocabDocRef = (uid: string, vocabId: string) => {
  return doc(db, "users", uid, "vocab", vocabId);
};

const updateVocabCurrentBox = (
  currentBox: number,
  recallDifficulty: RecallDifficulty
): number => {
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

const updateVocabDueDate = (
  vocab: Vocab,
  recallDifficulty: RecallDifficulty
) => {
  const interval = boxIntervals[vocab.box];
  let newDueDate;

  if (vocab.box === boxIntervals.length - 1 && recallDifficulty === "easy") {
    newDueDate = new Date(
      new Date(vocab.dueDate).getTime() + 365 * 86400000
    ).toISOString();
  } else {
    newDueDate = new Date(Date.now() + interval * 86400000).toISOString();
  }
  return newDueDate;
};

export const addVocabEntryDB = (newVocabWord: Vocab): AppThunk => {
  return async function (dispatch: Dispatch<AnyAction | AppThunk>) {
    try {
      if (auth.currentUser) {
        // Add the new vocab to the database
        await setDoc(
          getUserVocabDocRef(auth.currentUser.uid, newVocabWord.vocabId),
          { ...newVocabWord }
        );

        // add vocab word to local state
        dispatch(addVocabEntryInState(newVocabWord));
      }
    } catch (error: unknown) {
      const { message } = handleFirebaseError(error);
      dispatch(setAppError(message));
    }
  };
};

export const changeVocabBoxDB =
  ({
    vocabWord,
    recallDifficulty,
  }: {
    vocabWord: Vocab;
    recallDifficulty: RecallDifficulty;
  }): AppThunk =>
  async (dispatch: Dispatch<AnyAction | AppThunk>, getState) => {
    // Change the state using the reducer and update the database
    dispatch(
      changeVocabBoxInState({
        vocabId: vocabWord.vocabId,
        recallDifficulty,
      })
    );
    // Update the database
    const vocab = getState().vocab.find(
      (vocab) => vocab.vocabId === vocabWord.vocabId
    );

    if (vocab && auth.currentUser?.uid) {
      const vocabDocRef = getUserVocabDocRef(
        auth.currentUser.uid,
        vocabWord.vocabId
      );

      updateDoc(vocabDocRef, {
        box: vocab.box,
        dueDate: vocab.dueDate,
        lastUpdatedAt: new Date().toISOString(),
      });
    }
  };

export const removeVocabEntryDB =
  (vocabId: string): AppThunk =>
  async (dispatch: Dispatch<AnyAction | AppThunk>) => {
    dispatch(removeVocabEntryInState({ vocabId }));
    if (auth.currentUser) {
      try {
        const vocabDocRef = getUserVocabDocRef(auth.currentUser.uid, vocabId);

        await deleteDoc(vocabDocRef);
      } catch (error: unknown) {
        const { message } = handleFirebaseError(error);
        dispatch(setAppError(message));
      }
    }
  };

// Add a return type to the getVocabDB function
export const getVocabDB =
  (userId: string): AppThunk =>
  async (dispatch: Dispatch<AnyAction | AppThunk>) => {
    try {
      if (auth.currentUser) {
        const vocabCollectionRef = collection(db, "users", userId, "vocab");
        const vocabQuery = query(vocabCollectionRef);
        onSnapshot(vocabQuery, (querySnapshot) => {
          const vocabList: Vocab[] = [];
          querySnapshot.forEach((doc) => {
            const vocab = doc.data() as Vocab;
            vocabList.push(vocab);
          });
          dispatch(setVocabInState(vocabList));
        });
      } else {
        throw new Error("User not authenticated");
      }
    } catch (error: unknown) {
      const { message } = handleFirebaseError(error);
      dispatch(setAppError(message));
    }
  };

export const {
  addVocabEntryInState,
  changeVocabBoxInState,
  removeVocabEntryInState,
  setVocabInState,
  updateVocabEntryInState,
} = vocabSlice.actions;

export const vocabSelector = (state: RootState) => state.vocab;

export default vocabSlice;
