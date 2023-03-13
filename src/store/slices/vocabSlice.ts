import { handleFirebaseError } from "@/lib/firebaseError";
import { initialVocab } from "@/lib/initialVocab";
import { auth, db } from "@/services/firebase/firebaseService";
import { RecallDifficulty, Vocab } from "@/types/vocab";
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { AppThunk, RootState } from "../store";

const initialState: Vocab[] = initialVocab;

export const vocabSlice = createSlice({
  name: "vocab",
  initialState,
  reducers: {
    addVocabEntry: (state, action: PayloadAction<Vocab>) => {
      state.push(action.payload);
      addVocabWord(action.payload);
    },
    changeVocabStep: changeVocabStepReducer,
    removeVocabEntry: removeVocabEntryReducer,
    setVocabInState: (state, action: PayloadAction<Vocab[]>) => {
      state = action.payload;
    },
  },
});

export const addVocabWord = (newVocab: Vocab): AppThunk => {
  return async function (dispatch: Dispatch) {
    try {
      const vocabCollectionRef = collection(
        db,
        "users",
        auth.currentUser?.uid ?? "",
        "vocab"
      );

      // Add the new vocab to the database
      const docRef = await addDoc(vocabCollectionRef, newVocab);
      const newVocabWithId: Vocab = {
        ...newVocab,
        vocabId: docRef.id,
      };

      // Update the local state with the new vocab
      dispatch(vocabSlice.actions.addVocabEntry(newVocabWithId));
    } catch (error) {
      handleFirebaseError(error, dispatch);
    }
  };
};

function changeVocabStepReducer(
  vocabState: Vocab[],
  action: PayloadAction<{
    vocabId: string;
    recallDifficulty: RecallDifficulty;
  }>
) {
  const { vocabId, recallDifficulty } = action.payload;

  const vocabIndex = vocabState.findIndex((v) => v.vocabId === vocabId);
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
    vocabId
  );
  updateDoc(vocabDocRef, {
    currentStep: vocab.currentStep,
    dueDate,
    lastUpdatedAt: new Date().toISOString(),
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
  action: PayloadAction<{ vocabId: string }>
) {
  const { vocabId } = action.payload;

  const vocabIndex = vocabState.findIndex((v) => v.vocabId === vocabId);

  if (vocabIndex !== -1) {
    vocabState.splice(vocabIndex, 1);
  }

  if (auth.currentUser) {
    const vocabDocRef = doc(
      db,
      "users",
      auth.currentUser.uid,
      "vocab",
      vocabId
    );
    deleteDoc(vocabDocRef);
  }

  return vocabState;
}

export const setInitialVocab = (): AppThunk => async (dispatch: Dispatch) => {
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
      dispatch(setVocabInState(initialVocab));
    }
  } catch (error: unknown) {
    handleFirebaseError(error, dispatch);
  }
};

export const getVocabFromDB = (): AppThunk => async (dispatch: Dispatch) => {
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
        dispatch(setVocabInState(vocabEntries));
      });
    }
  } catch (error: unknown) {
    handleFirebaseError(error, dispatch);
  }
};

export const {
  addVocabEntry,
  changeVocabStep,
  removeVocabEntry,
  setVocabInState,
} = vocabSlice.actions;

export const vocabSelector = (state: RootState) => state.vocab;

export default vocabSlice;
