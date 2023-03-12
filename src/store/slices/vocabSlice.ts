import { auth, db } from "@/services/firebase/firebaseService";
import { RecallDifficulty, Vocab } from "@/types/vocab";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { RootState, store } from "../store";
import { setAppUser } from "./authSlice";

const currentDate = new Date().toISOString();

export const initialVocabProperties: Omit<Vocab, "emojiId" | "definition"> = {
  category: "",
  currentStep: 0,
  multiplier: 1,
  createdAt: currentDate,
  lastUpdatedAt: currentDate,
  dueDate: currentDate,
};

const initialState: Vocab[] = [];
const selectUser = (state: RootState) => state.auth.user;

export const vocabSlice = createSlice({
  name: "vocab",
  initialState,
  reducers: {
    addVocabEntry: addVocabEntryReducer,
    changeVocabStep: changeVocabStepReducer,
    removeVocabEntry: removeVocabEntryReducer,
  },
});

function addVocabEntryReducer(state: Vocab[], action: PayloadAction<Vocab>) {
  const newEntry = action.payload;
  const vocab = { ...newEntry, ...initialVocabProperties };

  // Retrieve the current user object from the state
  const user = selectUser(store.getState());

  if (user && auth.currentUser) {
    // Update the user object with the new vocabulary entry
    const updatedUser = {
      ...user,
      vocab: [...(user.vocab ?? []), vocab],
    };

    // Dispatch setAppUser action with updated user object
    store.dispatch(setAppUser({ user: updatedUser }));

    // Update user's vocab array in Firestore
    const userDocRef = doc(db, "users", user.uid);
    updateDoc(userDocRef, { vocab: [...(user.vocab ?? []), vocab] });
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

export const { addVocabEntry, changeVocabStep, removeVocabEntry } =
  vocabSlice.actions;

export const vocabSelector = (state: RootState) => state.vocab;

export default vocabSlice;
