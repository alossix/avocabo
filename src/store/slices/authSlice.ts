import { handleFirebaseError } from "@/lib/firebaseError";
import { initialVocab } from "@/lib/initialVocab";
import {
  auth,
  createUserWithEmailAndPassword,
  db,
  doc,
  onSnapshot,
  setDoc,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "@/services/firebase/firebaseService";
import { AppUser, InterfaceLanguages } from "@/types/general";
import {
  AnyAction,
  createSlice,
  PayloadAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { onAuthStateChanged, UserCredential } from "firebase/auth";
import { Dispatch } from "react";
import { AppThunk, RootState } from "../store";
import { addVocabEntryDB, getVocabDB, setVocabInState } from "./vocabSlice";

type AuthState = {
  user: AppUser | null;
  loading: boolean;
  error: string;
};

const initialState: AuthState = {
  user: null,
  loading: false,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAppUser: (state, action: PayloadAction<{ user: AppUser }>) => {
      const { user } = action.payload;
      state.user = { ...state.user, ...user };
      state.loading = false;
      state.error = "";
    },

    setAppLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setAppError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOutApp: (state) => {
      state.user = null;
    },
  },
});

// Listen for changes in the user's authentication state
export const listenForAuthChanges = (): AppThunk => (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Retrieve the user data from Firestore and dispatch the setUser action
      const userDocRef = doc(db, "users", user.uid);
      try {
        onSnapshot(userDocRef, (doc) => {
          if (doc.exists()) {
            const userData = doc.data() as AppUser;
            dispatch(setAppUser({ user: userData }));
          }
        });
      } catch (error) {
        dispatch(setAppError(error as string));
      }
    } else {
      dispatch(signOutApp());
    }
  });
};

// Create a new user with email and password
export const createUserAuth =
  ({
    displayName,
    email,
    interfaceLanguage,
    password,
  }: {
    displayName: string;
    email: string;
    interfaceLanguage: InterfaceLanguages;
    password: string;
  }): AppThunk =>
  async (dispatch: Dispatch<AnyAction | AppThunk>) => {
    dispatch(setAppLoading(true));

    try {
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(auth, email, password);

      const userData: AppUser = {
        email: userCredential.user.email,
        uid: userCredential.user.uid,
        displayName,
        emailVerified: userCredential.user.emailVerified,
        interfaceLanguage,
        userCreatedDate: new Date(),
        userLastSignIn: new Date(),
      };

      dispatch(setAppUser({ user: userData }));

      // Create a new document for the user in Firestore with the same UID
      await setDoc(doc(db, "users", userData.uid), { ...userData });

      initialVocab.map((vocabWord) => dispatch(addVocabEntryDB(vocabWord)));
    } catch (error: unknown) {
      handleFirebaseError(error, dispatch);
    }
  };

// Sign in with email and password
export const signInAuth =
  (email: string, password: string) =>
  async (dispatch: ThunkDispatch<RootState, void, AnyAction>) => {
    dispatch(setAppLoading(true));

    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Retrieve the user data from Firestore and dispatch the setUser action
      const userDocRef = doc(db, "users", userCredential.user.uid);
      onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          const userData = doc.data() as AppUser;
          dispatch(setAppUser({ user: userData }));
        }
      });
      dispatch(getVocabDB());
    } catch (error: unknown) {
      handleFirebaseError(error, dispatch);
    }
  };

// Sign out
export const signOutAuth =
  (): AppThunk => async (dispatch: Dispatch<AnyAction | AppThunk>) => {
    dispatch(setAppLoading(true));
    try {
      await firebaseSignOut(auth);
      dispatch(signOutApp());
      dispatch(setVocabInState([]));
    } catch (error: unknown) {
      handleFirebaseError(error, dispatch);
    }
  };

export const selectUserSignedIn = (state: RootState) => state.auth.user;
export const selectLoading = (state: { auth: AuthState }) => state.auth.loading;
export const selectError = (state: { auth: AuthState }) => state.auth.error;

export const { setAppUser, setAppLoading, setAppError, signOutApp } =
  authSlice.actions;

export default authSlice;
