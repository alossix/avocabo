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
} from "firebase/firestore"; // import getFirestore
import { Vocab } from "@/types/vocab";

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export const fetchVocabData = async (userId: string): Promise<Vocab[]> => {
  const vocabQuery = query(collection(db, "users", userId, "vocab"));
  const vocabSnapshot = await getDocs(vocabQuery);

  const vocabData: Vocab[] = [];
  vocabSnapshot.forEach((doc) => {
    const vocab = doc.data() as Vocab;
    vocabData.push(vocab);
  });

  return vocabData;
};

export const getIdToken = async (user: User): Promise<string | null> => {
  const idTokenResult = await getIdTokenResult(user);
  return idTokenResult.token;
};

export {
  auth,
  createUserWithEmailAndPassword,
  db,
  doc,
  onAuthStateChanged,
  onSnapshot,
  setDoc,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  addDoc,
  collection,
  deleteDoc,
  query,
  updateDoc,
  writeBatch,
};
