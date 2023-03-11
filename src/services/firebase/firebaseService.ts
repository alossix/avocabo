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
import { doc, getFirestore, onSnapshot, setDoc } from "firebase/firestore"; // import getFirestore

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
};
