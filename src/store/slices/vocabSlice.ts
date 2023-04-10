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
} from "@/services/firebase/firebaseService";
import { Vocab } from "@/types/vocab";
import { runTransaction } from "@firebase/firestore";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "../store";
import { setAppError } from "./authSlice";
import {
  dispatchAndUpdateDoc,
  getUserVocabDocRef,
} from "./sliceUtils/firebaseUtils";
import { getUpdatedDueDate } from "./sliceUtils/vocabUtils";

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
    setNextVocabEntriesDueTodayInState: (
      state,
      action: PayloadAction<{ vocabIds: string[] }>
    ) => {
      const { vocabIds } = action.payload;
      vocabIds.forEach((vocabId) => {
        const vocabIndex = state.findIndex((v) => v.vocabId === vocabId);
        if (vocabIndex !== -1) {
          state[vocabIndex].dueDate = new Date().toISOString();
        }
      });
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
      }
    } catch (error: unknown) {
      const { message } = handleAppError(error);
      dispatch(setAppError(message));
    }
  };

export const addInitialVocabBatchDB =
  (initialVocabWords: Vocab[]): AppThunk =>
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
      initialVocabWords.forEach(async (initialVocabWord) => {
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

            vocabList.push(vocab);
          });
          dispatch(setVocabInState(vocabList));
        });
      } else {
        throw new Error("User not authenticated");
      }
    } catch (error: unknown) {
      const { message } = handleAppError(error);
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
        const { message } = handleAppError(error);
        dispatch(setAppError(message));
      }
    }
  };

export const setNextVocabEntriesDueTodayDB =
  (): AppThunk => async (dispatch, getState) => {
    const state = getState();
    const vocabList = vocabSelector(state);
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
    const baseUpdatedProperties = {
      ...updatedProperties,
      lastUpdatedAt: new Date().toISOString(),
    };

    dispatch(
      updateVocabEntryInState({
        vocabId,
        updatedProperties: baseUpdatedProperties,
      })
    );

    if (auth.currentUser?.uid) {
      await dispatchAndUpdateDoc(
        dispatch,
        vocabId,
        baseUpdatedProperties,
        updateVocabEntryInState
      );
    }
  };

export const {
  addVocabEntryInState,
  removeVocabEntryInState,
  setNextVocabEntriesDueTodayInState,
  setVocabInState,
  updateVocabEntryInState,
} = vocabSlice.actions;

export const vocabSelector = (state: RootState) =>
  [...state.vocab].sort(
    (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  );

export default vocabSlice;
