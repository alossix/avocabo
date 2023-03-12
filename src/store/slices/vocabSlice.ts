import { initialVocab, initialVocabProperties } from "@/lib/initialVocab";
import { auth, db } from "@/services/firebase/firebaseService";
import { RecallDifficulty, Vocab } from "@/types/vocab";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { AppThunk, RootState } from "../store";

const initialState: Vocab[] = initialVocab;

export const vocabSlice = createSlice({
  name: "vocab",
  initialState,
  reducers: {
    addVocabEntry: addVocabEntryReducer,
    changeVocabStep: changeVocabStepReducer,
    removeVocabEntry: removeVocabEntryReducer,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    resetVocabState: (state) => [],
    setInitialVocabState: (state) => {
      state = initialVocab;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setVocabFromDB: (state, action: PayloadAction<Vocab[]>) => {
      return action.payload;
    },
  },
});

function addVocabEntryReducer(state: Vocab[], action: PayloadAction<Vocab>) {
  const newEntry = action.payload;
  const vocab = { ...newEntry, ...initialVocabProperties };

  if (auth.currentUser) {
    try {
      const vocabCollectionRef = collection(
        db,
        "users",
        auth.currentUser.uid,
        "vocab"
      );
      addDoc(vocabCollectionRef, vocab);
    } catch (error) {
      console.error(error);
    }
  }

  return [...state, vocab];
}

function changeVocabStepReducer(
  vocabState: Vocab[],
  action: PayloadAction<{
    emojiId: string;
    recallDifficulty: RecallDifficulty;
  }>
) {
  const { emojiId, recallDifficulty } = action.payload;

  const vocabIndex = vocabState.findIndex((v) => v.emojiId === emojiId);
  const vocab = vocabState[vocabIndex];

  if (recallDifficulty === "easy") {
    vocab.currentStep += 2;
  } else if (recallDifficulty === "medium") {
    vocab.currentStep += 1;
  } else if (recallDifficulty === "hard") {
    if (vocab.currentStep === 0) {
      vocab.currentStep = 0;
    } else {
      vocab.currentStep = Math.max(Math.floor(vocab.currentStep / 2), 1);
    }
  } else if (recallDifficulty === "forgot") {
    vocab.currentStep = 0;
  }

  const dueDate = new Date(
    Date.now() + vocab.currentStep * 86400000
  ).toISOString();

  const vocabDocRef = doc(
    db,
    "users",
    auth.currentUser?.uid ?? "",
    "vocab",
    emojiId
  );
  updateDoc(vocabDocRef, {
    currentStep: vocab.currentStep,
    dueDate,
    lastUpdatedAt: serverTimestamp(),
  });

  const newState = [...vocabState];
  newState[vocabIndex] = {
    ...vocab,
    currentStep: vocab.currentStep,
    dueDate,
    lastUpdatedAt: new Date().toISOString(),
  };
  return newState;
}

function removeVocabEntryReducer(
  vocabState: Vocab[],
  action: PayloadAction<{ emojiId: string }>
) {
  const { emojiId } = action.payload;

  const vocabIndex = vocabState.findIndex((v) => v.emojiId === emojiId);

  if (vocabIndex !== -1) {
    vocabState.splice(vocabIndex, 1);
  }

  if (auth.currentUser) {
    const vocabDocRef = doc(
      db,
      "users",
      auth.currentUser.uid,
      "vocab",
      emojiId
    );
    deleteDoc(vocabDocRef);
  }

  return vocabState;
}

export const setInitialVocab = (): AppThunk => async (dispatch) => {
  try {
    const uid = auth.currentUser?.uid;
    if (uid) {
      const vocabCollectionRef = collection(db, "users", uid, "vocab");
      const batch = writeBatch(db);

      initialVocab.forEach((vocabItem) => {
        const docRef = doc(vocabCollectionRef);
        batch.set(docRef, vocabItem);
      });

      await batch.commit();
      dispatch(setInitialVocabState());
    }
  } catch (error: unknown) {
    console.log("Error setting initial vocab collection:", error);
  }
};

export const getVocabFromDB = (): AppThunk => async (dispatch) => {
  try {
    const uid = auth.currentUser?.uid;
    if (uid) {
      const vocabCollectionRef = collection(db, "users", uid, "vocab");
      const vocabQuery = query(vocabCollectionRef);

      onSnapshot(vocabQuery, (querySnapshot) => {
        const vocabEntries: Vocab[] = [];
        querySnapshot.forEach((doc) => {
          const vocab = doc.data() as Vocab;
          vocabEntries.push(vocab);
        });
        dispatch(vocabSlice.actions.setVocabFromDB(vocabEntries));
      });
    }
  } catch (error: unknown) {
    console.log("Error retrieving vocabulary entries:", error);
  }
};

export const {
  addVocabEntry,
  changeVocabStep,
  removeVocabEntry,
  resetVocabState,
  setInitialVocabState,
  setVocabFromDB,
} = vocabSlice.actions;

export const vocabSelector = (state: RootState) => state.vocab;

export default vocabSlice;
