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

const initialState: Vocab[] = [];

export const vocabSlice = createSlice({
  name: "vocab",
  initialState,
  reducers: {
    addVocabEntryInState: (state, action: PayloadAction<Vocab>) => {
      state.push(action.payload);
    },
    changeVocabStepInState: (
      state,
      action: PayloadAction<{
        vocabId: string;
        recallDifficulty: RecallDifficulty;
      }>
    ) => {
      const { vocabId, recallDifficulty } = action.payload;

      return state.map((vocab) => {
        if (vocab.vocabId === vocabId) {
          const updatedVocab = { ...vocab };
          if (recallDifficulty === "easy") {
            updatedVocab.currentStep += 2;
          } else if (recallDifficulty === "medium") {
            updatedVocab.currentStep += 1;
          } else if (recallDifficulty === "hard") {
            if (updatedVocab.currentStep === 0) {
              updatedVocab.currentStep = 0;
            } else {
              updatedVocab.currentStep = Math.max(
                Math.floor(updatedVocab.currentStep / 2),
                1
              );
            }
          } else if (recallDifficulty === "forgot") {
            updatedVocab.currentStep = 0;
          }
          updatedVocab.dueDate = new Date(
            Date.now() + updatedVocab.currentStep * 86400000
          ).toISOString();
          updatedVocab.lastUpdatedAt = new Date().toISOString();
          changeVocabStepDB(updatedVocab);
          return updatedVocab;
        } else {
          return vocab;
        }
      });
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

export const addVocabEntryDB = (newVocabWord: Vocab): AppThunk => {
  return async function (dispatch: Dispatch<AnyAction | AppThunk>) {
    try {
      if (auth.currentUser) {
        // Add the new vocab to the database
        await setDoc(
          doc(db, "users", auth.currentUser.uid, "vocab", newVocabWord.vocabId),
          { ...newVocabWord }
        );

        // add vocab word to local state
        dispatch(addVocabEntryInState(newVocabWord));
      }
    } catch (error) {
      handleFirebaseError(error, dispatch);
    }
  };
};

const changeVocabStepDB = (vocabWord: Vocab) => {
  if (auth.currentUser) {
    const userDocRef = doc(db, "users", auth.currentUser.uid);
    const vocabDocRef = doc(userDocRef, "vocab", vocabWord.vocabId);

    updateDoc(vocabDocRef, {
      currentStep: vocabWord.currentStep,
      dueDate: vocabWord.dueDate,
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
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const vocabDocRef = doc(userDocRef, "vocab", vocabId);

        await deleteDoc(vocabDocRef);
      } catch (error) {
        handleFirebaseError(error, dispatch);
      }
    }
  };

export const getVocabDB =
  (): AppThunk => async (dispatch: Dispatch<AnyAction | AppThunk>) => {
    try {
      if (auth.currentUser) {
        const vocabCollectionRef = collection(
          db,
          "users",
          auth.currentUser.uid,
          "vocab"
        );
        const vocabQuery = query(vocabCollectionRef);
        onSnapshot(vocabQuery, (querySnapshot) => {
          const vocabList: Vocab[] = [];
          querySnapshot.forEach((doc) => {
            const vocab = doc.data() as Vocab;
            vocabList.push(vocab);
          });
          dispatch(setVocabInState(vocabList));
        });
      }
    } catch (error: unknown) {
      handleFirebaseError(error, dispatch);
    }
  };

export const {
  addVocabEntryInState,
  changeVocabStepInState,
  removeVocabEntryInState,
  setVocabInState,
  updateVocabEntryInState,
} = vocabSlice.actions;

export const vocabSelector = (state: RootState) => state.vocab;

export default vocabSlice;
