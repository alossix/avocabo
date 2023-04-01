import { handleFirebaseError } from "@/lib/firebaseError";
import {
  auth,
  collection,
  db,
  deleteDoc,
  onSnapshot,
  query,
  setDoc,
} from "@/services/firebase/firebaseService";
import { Vocab } from "@/types/vocab";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../store";
import { setAppError } from "./authSlice";
import {
  dispatchAndUpdateDoc,
  getUserVocabDocRef,
} from "./sliceUtils/firebaseUtils";

const initialState: Vocab[] = [];

export const vocabSlice = createSlice({
  name: "vocab",
  initialState,
  reducers: {
    addVocabEntryInState: (state, action: PayloadAction<Vocab>) => {
      state.push(action.payload);
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
    updateVocabEntryInState: (
      state,
      action: PayloadAction<{
        vocabId: string;
        updatedProperties: Partial<Vocab>;
      }>
    ) => {
      const { vocabId, updatedProperties } = action.payload;
      const vocabIndex = state.findIndex((v) => v.vocabId === vocabId);
      state[vocabIndex] = { ...state[vocabIndex], ...updatedProperties };
    },
  },
});

export const addVocabEntryDB =
  ({ newVocabWord }: { newVocabWord: Vocab }): AppThunk =>
  async (dispatch) => {
    try {
      if (auth.currentUser) {
        // Add the new vocab to the database
        await setDoc(
          getUserVocabDocRef({
            uid: auth.currentUser.uid,
            vocabId: newVocabWord.vocabId,
          }),
          { ...newVocabWord }
        );

        // add vocab word to local state
        dispatch(addVocabEntryInState(newVocabWord));
        console.log(`dispatch called with ${newVocabWord.definition}`);
      }
    } catch (error: unknown) {
      const { message } = handleFirebaseError(error);
      dispatch(setAppError(message));
    }
  };

export const removeVocabEntryDB =
  ({ vocabId }: { vocabId: string }): AppThunk =>
  async (dispatch) => {
    dispatch(removeVocabEntryInState({ vocabId }));
    if (auth.currentUser) {
      try {
        const vocabDocRef = getUserVocabDocRef({
          uid: auth.currentUser.uid,
          vocabId,
        });

        await deleteDoc(vocabDocRef);
      } catch (error: unknown) {
        const { message } = handleFirebaseError(error);
        dispatch(setAppError(message));
      }
    }
  };

export const getVocabDB =
  ({ userId }: { userId: string }): AppThunk =>
  async (dispatch) => {
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

// update vocab entry in db
export const updateVocabEntryDB =
  ({
    vocabWord,
    updatedProperties,
  }: {
    vocabWord: Vocab;
    updatedProperties: Partial<Vocab>;
  }): AppThunk =>
  async (dispatch) => {
    const baseUpdatedProperties = {
      ...updatedProperties,
      lastUpdatedAt: new Date().toISOString(),
    };

    if (auth.currentUser?.uid) {
      await dispatchAndUpdateDoc(
        dispatch,
        vocabWord.vocabId,
        baseUpdatedProperties,
        updateVocabEntryInState
      );
    }
  };

export const {
  addVocabEntryInState,
  removeVocabEntryInState,
  setVocabInState,
  updateVocabEntryInState,
} = vocabSlice.actions;

export const vocabSelector = (state: RootState) => state.vocab;

export default vocabSlice;
