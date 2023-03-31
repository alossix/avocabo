import { handleFirebaseError } from "@/lib/firebaseError";
import { initialVocabSet } from "@/lib/initialVocab";
import {
  auth,
  createUserWithEmailAndPassword,
  db,
  doc,
  onSnapshot,
  setDoc,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateDoc,
} from "@/services/firebase/firebaseService";
import {
  AppUser,
  InterfaceLanguages,
  LearningLanguages,
} from "@/types/general";
import {
  AnyAction,
  createSlice,
  PayloadAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import setLanguage from "next-translate/setLanguage";
import { Dispatch } from "react";
import { AppDispatch, AppThunk, RootState } from "../store";
import { setInterfaceLanguage } from "./interfaceLanguageSlice";
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
    initializeAuth: (state, action) => {
      state.user = action.payload.user;
    },
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

const getUserDocRef = ({ uid }: { uid: string }) => {
  return doc(db, "users", uid);
};

const setupInitialVocab = ({
  dispatch,
  learningLanguage,
}: {
  dispatch: Dispatch<AnyAction | AppThunk>;
  learningLanguage: LearningLanguages;
}) => {
  initialVocabSet[learningLanguage].forEach((newVocabWord) => {
    dispatch(addVocabEntryDB({ newVocabWord }));
  });
};

// Listen for changes in the user's authentication state
export const listenForAuthChanges =
  (setUserCookie: (user: AppUser) => void) =>
  (dispatch: AppDispatch): (() => void) => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // Retrieve the user data from Firestore and dispatch the setUser action
        const userDocRef = getUserDocRef({ uid: user.uid });
        try {
          onSnapshot(userDocRef, (doc) => {
            if (doc.exists()) {
              const userData = doc.data() as AppUser;
              dispatch(setAppUser({ user: userData }));

              // Set user cookie
              setUserCookie(userData);
            }
          });
        } catch (error: unknown) {
          const { message } = handleFirebaseError(error);
          dispatch(setAppError(message));
        }
      } else {
        dispatch(signOutApp());
      }
    });

    return () => {
      unsubscribe();
    };
  };

// Create a new user with email and password
export const createUserAuth =
  ({
    displayName,
    email,
    interfaceLanguage,
    learningLanguage,
    password,
  }: {
    displayName: string;
    email: string;
    interfaceLanguage: InterfaceLanguages;
    learningLanguage: LearningLanguages;
    password: string;
  }): AppThunk =>
  async (dispatch: Dispatch<AnyAction | AppThunk>) => {
    dispatch(setAppLoading(true));

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userData: AppUser = {
        email: userCredential.user.email,
        uid: userCredential.user.uid,
        displayName,
        emailVerified: userCredential.user.emailVerified,
        interfaceLanguage,
        learningLanguage,
        userCreatedDate: new Date(),
        userLastSignIn: new Date(),
      };

      dispatch(setAppUser({ user: userData }));

      // Create a new document for the user in Firestore with the same UID
      const userDocRef = getUserDocRef({ uid: userData.uid });
      await setDoc(userDocRef, { ...userData });
      setupInitialVocab({ dispatch, learningLanguage });
    } catch (error: unknown) {
      const { message } = handleFirebaseError(error);
      dispatch(setAppError(message));
    }
  };

// Sign in with email and password
export const signInAuth =
  (email: string, password: string) =>
  async (dispatch: ThunkDispatch<RootState, void, AnyAction>) => {
    dispatch(setAppLoading(true));
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Retrieve the user data from Firestore and dispatch the setUser action
      const userDocRef = getUserDocRef({ uid: userCredential.user.uid });
      onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          const userData = doc.data() as AppUser;
          dispatch(setAppUser({ user: userData }));
          // set language in next-translate context
          setLanguage(userData.interfaceLanguage);
        }
      });
      dispatch(getVocabDB({ userId: userCredential.user.uid }));
    } catch (error: unknown) {
      const { message } = handleFirebaseError(error);
      dispatch(setAppError(message));
    }
  };

// Sign out
export const signOutAuth =
  (currentUser: AppUser): AppThunk =>
  async (dispatch: Dispatch<AnyAction | AppThunk>) => {
    dispatch(setAppLoading(true));
    dispatch(setInterfaceLanguage(currentUser.interfaceLanguage));
    try {
      await firebaseSignOut(auth);
      dispatch(signOutApp());
      dispatch(setVocabInState([]));
    } catch (error: unknown) {
      const { message } = handleFirebaseError(error);
      dispatch(setAppError(message));
    }
  };

// Update the user document in the database
export const updateUserAuth =
  (updatedUserData: Partial<AppUser>): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setAppLoading(true));

    try {
      const { user } = getState().auth;

      if (!user) {
        throw new Error("User is not signed in");
      }

      // Update the user document in Firestore
      const userDocRef = getUserDocRef({ uid: user.uid });
      await updateDoc(userDocRef, updatedUserData);

      // Update the user object in the Redux store
      dispatch(setAppUser({ user: { ...user, ...updatedUserData } }));
    } catch (error: unknown) {
      const { message } = handleFirebaseError(error);
      dispatch(setAppError(message));
    } finally {
      dispatch(setAppLoading(false));
    }
  };

export const selectUserSignedIn = (state: RootState) => state.auth.user;
export const selectLoading = (state: { auth: AuthState }) => state.auth.loading;
export const selectError = (state: { auth: AuthState }) => state.auth.error;

export const {
  initializeAuth,
  setAppUser,
  setAppLoading,
  setAppError,
  signOutApp,
} = authSlice.actions;

export default authSlice;
