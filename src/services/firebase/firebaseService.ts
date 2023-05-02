import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  getIdTokenResult,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { Vocab } from "@/types/vocab";

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export const fetchVocabData = async (
  userId: string
): Promise<{ [vocabId: string]: Vocab }> => {
  const vocabQuery = query(collection(db, "users", userId, "vocab"));
  const vocabSnapshot = await getDocs(vocabQuery);

  const vocabData: { [vocabId: string]: Vocab } = {};
  vocabSnapshot.forEach((doc) => {
    const vocab = doc.data() as Vocab;
    vocabData[vocab.vocabId] = vocab;
  });

  return vocabData;
};

export const getIdToken = async (user: User): Promise<string | null> => {
  const idTokenResult = await getIdTokenResult(user);
  return idTokenResult.token;
};

export {
  addDoc,
  auth,
  collection,
  createUserWithEmailAndPassword,
  db,
  deleteDoc,
  doc,
  getDownloadURL,
  onAuthStateChanged,
  onSnapshot,
  query,
  ref,
  setDoc,
  signInWithEmailAndPassword,
  signOut,
  storage,
  updateDoc,
  updateProfile,
  uploadBytes,
  writeBatch,
};
