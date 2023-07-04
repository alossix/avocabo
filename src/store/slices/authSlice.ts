import { handleAppError } from "@/lib/handleAppError";
import { commonNounsCA as ca } from "@/lib/vocabPacks/commonNouns/ca";
import { commonNounsDE as de } from "@/lib/vocabPacks/commonNouns/de";
import { commonNounsEN as en } from "@/lib/vocabPacks/commonNouns/en";
import { commonNounsES as es } from "@/lib/vocabPacks/commonNouns/es";
import { commonNounsFR as fr } from "@/lib/vocabPacks/commonNouns/fr";
import { commonNounsIT as it } from "@/lib/vocabPacks/commonNouns/it";
import { commonNounsNL as nl } from "@/lib/vocabPacks/commonNouns/nl";
import { initialVocabSetOther as other } from "@/lib/initialVocabSets/other";
import { initialVocabSetUK as uk } from "@/lib/initialVocabSets/uk";
import {
  auth,
  collection,
  createUserWithEmailAndPassword,
  db,
  deleteDoc,
  deleteObject,
  doc,
  signOut as firebaseSignOut,
  listAll,
  onSnapshot,
  ref,
  sendEmailVerification,
  setDoc,
  signInWithEmailAndPassword,
  storage,
  updateDoc,
} from "@/services/firebase/firebaseService";
import {
  AppUser,
  InterfaceLanguages,
  LearningLanguages,
} from "@/types/general";
import { Vocab } from "@/types/vocab";
import {
  AnyAction,
  PayloadAction,
  ThunkDispatch,
  createSlice,
} from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import setLanguage from "next-translate/setLanguage";
import { Dispatch } from "react";
import { AppThunk, RootState } from "../store";
import {
  addInitialVocabBatchDB,
  getVocabDB,
  setVocabInState,
} from "./vocabSlice";
import { DocumentReference, getDocs } from "firebase/firestore";
const initialVocabSet: {
  [key in LearningLanguages]: { [vocabId: string]: Vocab };
} = {
  ca,
  de,
  en,
  es,
  fr,
  it,
  nl,
  other,
  uk,
};

export type AuthState = {
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
      state.error = "";
      state.user = null;
    },
  },
});

export const getUserDocRef = ({ uid }: { uid: string }) => {
  return doc(db, "users", uid);
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

      await sendEmailVerification(userCredential.user);

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

      // Add the initial vocabulary set for the user
      dispatch(addInitialVocabBatchDB(initialVocabSet[learningLanguage]));
    } catch (error: unknown) {
      const { message } = handleAppError(error);
      dispatch(setAppError(message));
    }
  };

// delete user collections in firestore
const deleteSubcollections = async (parentRef: DocumentReference) => {
  const subcollections = ["vocab"];

  for (const subcollection of subcollections) {
    const subcollectionRef = collection(parentRef, subcollection);
    const subcollectionDocs = await getDocs(subcollectionRef);

    for (const subcollectionDoc of subcollectionDocs.docs) {
      await deleteSubcollections(subcollectionDoc.ref);
      await deleteDoc(subcollectionDoc.ref);
    }
  }
};

// delete user document in firestore
const deleteUserDocument = async (userId: string) => {
  const userDocRef = getUserDocRef({ uid: userId });

  await deleteSubcollections(userDocRef);
  await deleteDoc(userDocRef);
};

// delete user folder in firebase storage
const deleteUserFolder = async (userId: string, folderPath: string) => {
  const userFolderRef = ref(storage, folderPath);
  try {
    const { items, prefixes } = await listAll(userFolderRef);

    // Delete all files in the user folder
    const deleteFilesPromises = items.map((item) => deleteObject(item));
    await Promise.all(deleteFilesPromises);

    // Recursively delete all subdirectories in the user folder
    const deleteSubdirectoriesPromises = prefixes.map((subdirectory) => {
      const relativePath = subdirectory.fullPath.replace(
        `users/${userId}/`,
        ""
      );
      return deleteUserFolder(userId, `users/${userId}/${relativePath}`);
    });
    await Promise.all(deleteSubdirectoriesPromises);
  } catch (error) {
    console.error("Error deleting user folder:", error);
    throw error;
  }
};

// delete user
export const deleteUserAuth =
  (): AppThunk =>
  async (dispatch: Dispatch<AnyAction | AppThunk>, getState) => {
    dispatch(setAppLoading(true));

    try {
      const { user } = getState().auth;

      if (!user) {
        throw new Error("User is not signed in");
      }

      // Delete the user folder in Firebase Storage: custom user images
      await deleteUserFolder(user.uid, `users/${user.uid}`);

      // Delete the user document in Firestore
      await deleteUserDocument(user.uid);

      // Delete the user's authentication data
      const currentUser = auth.currentUser;
      if (currentUser) {
        // Delete the user
        await currentUser.delete();
      }

      // Sign out the user
      dispatch(signOutAuth());
    } catch (error: unknown) {
      const { message } = handleAppError(error);
      dispatch(setAppError(message));
    } finally {
      dispatch(setAppLoading(false));
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
      const { message } = handleAppError(error);
      dispatch(setAppError(message));
    }
  };

// Sign out
export const signOutAuth =
  (): AppThunk => async (dispatch: Dispatch<AnyAction | AppThunk>) => {
    dispatch(setAppLoading(true));
    try {
      Cookies.remove("currentUser");

      await firebaseSignOut(auth);

      dispatch(signOutApp());
      dispatch(setVocabInState({}));
    } catch (error: unknown) {
      const { message } = handleAppError(error);
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
      const { message } = handleAppError(error);
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
