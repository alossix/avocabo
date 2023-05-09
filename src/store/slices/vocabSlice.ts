import { handleAppError } from "@/lib/handleAppError";
import {
  auth,
  collection,
  db,
  deleteDoc,
  deleteObject,
  doc,
  onSnapshot,
  query,
  ref,
  setDoc,
  storage,
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

export const addInitialVocabBatchDB =
  (initialVocabWords: { [vocabId: string]: Vocab }): AppThunk =>
  async (dispatch) => {
    if (!auth.currentUser) {
      dispatch(setAppError("User is not signed in"));
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

export const addVocabEntryDB =
  ({ newVocabWord }: { newVocabWord: Vocab }): AppThunk =>
  async (dispatch) => {
    if (!auth.currentUser) {
      dispatch(setAppError("User is not signed in"));
      throw new Error("User is not signed in");
    }

    const vocabDocRef = doc(
      db,
      "users",
      auth.currentUser.uid,
      "vocab",
      newVocabWord.vocabId
    );

    await setDoc(vocabDocRef, newVocabWord);

    dispatch(addVocabEntryInState(newVocabWord));
  };

export const getVocabDB =
  ({ userId }: { userId: string }): AppThunk<Promise<Unsubscribe>> =>
  async (dispatch) => {
    if (!auth.currentUser) {
      dispatch(setAppError("User is not signed in"));
      throw new Error("User is not signed in");
    }

    try {
      const vocabCollectionRef = collection(db, "users", userId, "vocab");
      const vocabQuery = query(vocabCollectionRef);
      return onSnapshot(vocabQuery, (querySnapshot) => {
        const vocabList: { [vocabId: string]: Vocab } = {};
        querySnapshot.forEach((doc) => {
          const vocab = doc.data() as Vocab;

          // Update the dueDate if it's in the past
          const updatedDueDate = getUpdatedDueDate(vocab.dueDate);
          if (updatedDueDate !== vocab.dueDate) {
            vocab.dueDate = updatedDueDate;
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
    } catch (error: unknown) {
      const { message } = handleAppError(error);
      dispatch(setAppError(message));
      return Promise.reject(error);
    }
  };

export const removeVocabEntryDB =
  ({ imageURL, vocabId }: { imageURL?: string; vocabId: string }): AppThunk =>
  async (dispatch) => {
    if (!auth.currentUser) {
      dispatch(setAppError("User is not signed in"));
      throw new Error("User is not signed in");
    }

    dispatch(removeVocabEntryInState({ vocabId }));

    try {
      const vocabDocRef = getUserVocabDocRef({
        uid: auth.currentUser.uid,
        vocabId,
      });

      await deleteDoc(vocabDocRef);

      // Delete the uploaded image if available
      if (imageURL) {
        function extractUuidFromUrl(url: string): string | null {
          const uuidRegex =
            /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/;
          const match = url.match(uuidRegex);

          return match ? match[0] : null;
        }

        const imageUUID = extractUuidFromUrl(imageURL);
        const userId = auth.currentUser.uid;
        const imageStorageRef = ref(
          storage,
          `users/${userId}/images/${imageUUID}`
        );
        await deleteObject(imageStorageRef);
      }
    } catch (error: unknown) {
      const { message } = handleAppError(error);
      dispatch(setAppError(message));
    }
  };

export const setNextVocabEntriesDueTodayDB =
  (): AppThunk => async (dispatch, getState) => {
    if (!auth.currentUser) {
      dispatch(setAppError("User is not signed in"));
      throw new Error("User is not signed in");
    }

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
    await Promise.all(
      next20VocabIds.map((vocabId) =>
        dispatch(
          updateVocabEntryDB({
            vocabId,
            updatedProperties: { dueDate: today },
          })
        )
      )
    );
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
      dispatch(setAppError("User is not signed in"));
      throw new Error("User is not signed in");
    }

    const vocabDocRef = doc(
      db,
      "users",
      auth.currentUser.uid,
      "vocab",
      vocabId
    );

    await updateDoc(vocabDocRef, updatedProperties);

    dispatch(updateVocabEntryInState({ vocabId, updatedProperties }));
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
