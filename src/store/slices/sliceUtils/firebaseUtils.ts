import {
  auth,
  db,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from "@/services/firebase/firebaseService";
import { RootState } from "@/store/store";
import { Vocab } from "@/types/vocab";
import { Action, PayloadAction, ThunkDispatch } from "@reduxjs/toolkit";

export const getUserVocabDocRef = ({
  uid,
  vocabId,
}: {
  uid: string;
  vocabId: string;
}) => {
  return doc(db, "users", uid, "vocab", vocabId);
};

export const setVocabDoc = async (
  uid: string,
  vocabId: string,
  newVocabWord: Vocab
) => {
  await setDoc(getUserVocabDocRef({ uid, vocabId }), { ...newVocabWord });
};

export const updateVocabDoc = async (
  uid: string,
  vocabId: string,
  updatedProperties: Partial<Vocab>
) => {
  await updateDoc(getUserVocabDocRef({ uid, vocabId }), updatedProperties);
};

export const deleteVocabDoc = async (uid: string, vocabId: string) => {
  await deleteDoc(getUserVocabDocRef({ uid, vocabId }));
};

export const dispatchAndUpdateDoc = async <T>(
  dispatch: ThunkDispatch<RootState, unknown, Action<string>>,
  vocabId: string,
  updatedProperties: Partial<Vocab>,
  action: (payload: {
    vocabId: string;
    updatedProperties: Partial<Vocab>;
  }) => PayloadAction<T>
) => {
  dispatch(action({ vocabId, updatedProperties }));

  if (auth.currentUser?.uid) {
    const vocabDocRef = getUserVocabDocRef({
      uid: auth.currentUser.uid,
      vocabId,
    });

    await updateDoc(vocabDocRef, updatedProperties);
  }
};
