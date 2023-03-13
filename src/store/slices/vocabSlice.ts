import { handleFirebaseError } from "@/lib/firebaseError";
import {
  addDoc,
  auth,
  collection,
  db,
  deleteDoc,
  doc,
  onSnapshot,
  query,
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

      const vocabIndex = state.findIndex((v) => v.vocabId === vocabId);
      const vocab = state[vocabIndex];

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

      const newState = [...state];
      newState[vocabIndex] = {
        ...vocab,
        currentStep: vocab.currentStep,
        dueDate,
        lastUpdatedAt: new Date().toISOString(),
      };
      state = [...newState];
      changeVocabStepDB(newState[vocabIndex]);
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
      state = action.payload;
    },
    updateVocabEntryInState: (state, action: PayloadAction<Vocab>) => {
      const { vocabId } = action.payload;
      const vocabIndex = state.findIndex((v) => v.vocabId === vocabId);
      state[vocabIndex] = action.payload;
    },
  },
});

export const addVocabEntryDB = (newVocab: Vocab): AppThunk => {
  return async function (dispatch: Dispatch<AnyAction | AppThunk>) {
    try {
      if (auth.currentUser) {
        const vocabCollectionRef = collection(
          db,
          "users",
          auth.currentUser.uid,
          "vocab"
        );
        // Add the new vocab to the database
        const docRef = await addDoc(vocabCollectionRef, newVocab);
        const newVocabWithId: Vocab = {
          ...newVocab,
          vocabId: docRef.id,
        };
        dispatch(addVocabEntryInState(newVocabWithId));
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
    if (auth.currentUser) {
      try {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const vocabDocRef = doc(userDocRef, "vocab", vocabId);

        await deleteDoc(vocabDocRef);
      } catch (error) {
        handleFirebaseError(error, dispatch);
      }
    }
    dispatch(removeVocabEntryInState({ vocabId }));
  };

// export const setInitialVocabInDB =
//   (initialVocabList: Vocab[]): AppThunk =>
//   async (dispatch: Dispatch<AnyAction | AppThunk>) => {
//     try {
//       if (auth.currentUser) {
//         const vocabCollectionRef = collection(
//           db,
//           "users",
//           auth.currentUser.uid,
//           "vocab"
//         );

//         const newInitialVocab = await Promise.all(
//           initialVocabList.map(async (vocabItem) => {
//             dispatch(addVocabEntryDB(vocabItem));
//           })
//         );
//         console.log(`newinitialvocab: ${newInitialVocab}`);
//       }
//     } catch (error: unknown) {
//       handleFirebaseError(error, dispatch);
//     }
//   };

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
  addVocabEntryInState,
  changeVocabStepInState,
  removeVocabEntryInState,
  setVocabInState,
  updateVocabEntryInState,
} = vocabSlice.actions;

export const vocabSelector = (state: RootState) => state.vocab;

export default vocabSlice;
