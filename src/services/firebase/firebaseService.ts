import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  writeBatch,
} from "firebase/firestore"; // import getFirestore

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

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
