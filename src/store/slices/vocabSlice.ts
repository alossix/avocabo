import { handleAppError } from "@/lib/handleAppError";
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
import { Vocab } from "@/types/vocab";
import { runTransaction } from "@firebase/firestore";
import { PayloadAction, Unsubscribe, createSlice } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../store";
import { setAppError } from "./authSlice";
import { getUserVocabDocRef } from "./sliceUtils/firebaseUtils";
import { getUpdatedDueDate } from "./sliceUtils/vocabUtils";

const initialState: { [vocabId: string]: Vocab } = {};

export const vocabSlice = createSlice({
  name: "vocab",
  initialState,
  reducers: {
    addVocabEntryInState: (state, action: PayloadAction<Vocab>) => {
      const vocab = action.payload;
      state[vocab.vocabId] = vocab;
    },

    removeVocabEntryInState: (
      state,
      action: PayloadAction<{ vocabId: string }>
    ) => {
      const { vocabId } = action.payload;
      delete state[vocabId];
    },

    setNextVocabEntriesDueTodayInState: (
      state,
      action: PayloadAction<{ vocabIds: string[] }>
    ) => {
      const { vocabIds } = action.payload;
      const today = new Date().toISOString();

      vocabIds.forEach((vocabId) => {
        if (state[vocabId]) {
          state[vocabId].dueDate = today;
        }
      });
    },

    setVocabInState: (
      state,
      action: PayloadAction<{ [vocabId: string]: Vocab }>
    ) => {
      const vocabObject = action.payload;
      return { ...vocabObject };
    },

    updateVocabEntryInState: (
      state,
      action: PayloadAction<{
        vocabId: string;
        updatedProperties: Partial<Vocab>;
      }>
    ) => {
      const { vocabId, updatedProperties } = action.payload;
      state[vocabId] = { ...state[vocabId], ...updatedProperties };
    },
  },
});

export const addVocabEntryDB =
  ({ newVocabWord }: { newVocabWord: Vocab }): AppThunk =>
  async (dispatch) => {
    if (!auth.currentUser) {
      throw new Error("User is not signed in");
    }

    const vocabDocRef = doc(
      db,
      "users",
      auth.currentUser.uid,
      "vocab",
      newVocabWord.vocabId // reference the document by vocabId instead of index
    );

    await setDoc(vocabDocRef, newVocabWord);

    dispatch(getVocabDB({ userId: auth.currentUser.uid }));
  };

export const addInitialVocabBatchDB =
  (initialVocabWords: { [vocabId: string]: Vocab }): AppThunk =>
  async (dispatch) => {
    if (!auth.currentUser) {
      throw new Error("User is not signed in");
    }

    const vocabCollectionRef = collection(
      db,
      "users",
      auth.currentUser.uid,
      "vocab"
    );

    await runTransaction(db, async (transaction) => {
      Object.keys(initialVocabWords).forEach(async (vocabId) => {
        const initialVocabWord = initialVocabWords[vocabId];
        const newVocabDocRef = doc(
          vocabCollectionRef,
          initialVocabWord.vocabId
        );
        transaction.set(newVocabDocRef, initialVocabWord);
      });
    });

    dispatch(getVocabDB({ userId: auth.currentUser.uid }));
  };

export const getVocabDB =
  ({ userId }: { userId: string }): AppThunk<Promise<Unsubscribe>> =>
  async (dispatch) => {
    const user = auth.currentUser;
    if (user) {
      try {
        const vocabCollectionRef = collection(db, "users", userId, "vocab");
        const vocabQuery = query(vocabCollectionRef);
        const unsubscribe = onSnapshot(vocabQuery, (querySnapshot) => {
          const vocabList: { [vocabId: string]: Vocab } = {};
          querySnapshot.forEach((doc) => {
            const vocab = doc.data() as Vocab;

            // Update the dueDate if it's in the past
            const updatedDueDate = getUpdatedDueDate(vocab.dueDate);
            if (updatedDueDate !== vocab.dueDate) {
              vocab.dueDate = updatedDueDate;
              // Call updateVocabEntryDB to save the updated dueDate in the database
              dispatch(
                updateVocabEntryDB({
                  vocabId: vocab.vocabId,
                  updatedProperties: { dueDate: updatedDueDate },
                })
              );
            }

            vocabList[vocab.vocabId] = vocab;
          });
          dispatch(setVocabInState(vocabList));
        });
        return Promise.resolve(unsubscribe);
      } catch (error: unknown) {
        const { message } = handleAppError(error);
        dispatch(setAppError(message));
        return Promise.reject(error);
      }
    } else {
      return Promise.reject(new Error("User not authenticated"));
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
        const { message } = handleAppError(error);
        dispatch(setAppError(message));
      }
    }
  };

export const setNextVocabEntriesDueTodayDB =
  (): AppThunk => async (dispatch, getState) => {
    const state = getState();
    const vocabList = Object.values(vocabSelector(state));
    const today = new Date().toISOString();
    const notDueTodayVocab = vocabList.filter(
      (vocab) => new Date(vocab.dueDate).toISOString() !== today
    );
    const next20VocabIds = notDueTodayVocab
      .slice(0, 20)
      .map((vocab) => vocab.vocabId);

    // Update the dueDate of the next 20 entries in the local state
    dispatch(setNextVocabEntriesDueTodayInState({ vocabIds: next20VocabIds }));

    // Update the dueDate of the next 20 entries in the database
    next20VocabIds.forEach((vocabId) => {
      dispatch(
        updateVocabEntryDB({
          vocabId,
          updatedProperties: { dueDate: today },
        })
      );
    });
  };

// update vocab entry in db
export const updateVocabEntryDB =
  ({
    vocabId,
    updatedProperties,
  }: {
    vocabId: string;
    updatedProperties: Partial<Vocab>;
  }): AppThunk =>
  async (dispatch) => {
    if (!auth.currentUser) {
      throw new Error("User is not signed in");
    }

    const vocabDocRef = doc(
      db,
      "users",
      auth.currentUser.uid,
      "vocab",
      vocabId // reference the document by vocabId instead of index
    );

    await updateDoc(vocabDocRef, updatedProperties);

    dispatch(getVocabDB({ userId: auth.currentUser.uid }));
  };

export const {
  addVocabEntryInState,
  removeVocabEntryInState,
  setNextVocabEntriesDueTodayInState,
  setVocabInState,
  updateVocabEntryInState,
} = vocabSlice.actions;

export const vocabSelector = (state: RootState) => {
  return state.vocab;
};

export default vocabSlice;
