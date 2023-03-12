import { handleFirebaseError } from "@/lib/firebaseError";
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
import { AppUser } from "@/types/general";
import {
  AnyAction,
  createSlice,
  PayloadAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import { UserCredential } from "firebase/auth";

import { AppThunk, RootState } from "../store";
import { getVocabFromDB, resetVocabState, setInitialVocab } from "./vocabSlice";

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
// export const listenForAuthChanges = (): AppThunk => (dispatch) => {
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       // Retrieve the user data from Firestore and dispatch the setUser action
//       const userDocRef = doc(db, "users", user.uid);
//       try {
//         onSnapshot(userDocRef, (doc) => {
//           if (doc.exists()) {
//             console.log(`doc exists, data: ${doc.data}`);
//             const userData = doc.data() as AppUser;
//             dispatch(setAppUser({ user: userData }));
//           }
//         });
//       } catch (error) {
//         dispatch(setAppError(error as string));
//       }
//     } else {
//       dispatch(signOutApp());
//     }
//   });
// };

// Create a new user with email and password
export const createUserAuth =
  (displayName: string, email: string, password: string): AppThunk =>
  async (dispatch) => {
    dispatch(setAppLoading(true));

    try {
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(auth, email, password);

      const userData: AppUser = {
        email: userCredential.user.email,
        uid: userCredential.user.uid,
        displayName,
        emailVerified: userCredential.user.emailVerified,
        userCreatedDate: new Date(),
        userLastSignIn: new Date(),
      };

      dispatch(setAppUser({ user: userData }));
      dispatch(setInitialVocab());

      // Create a new document for the user in Firestore with the same UID
      await setDoc(doc(db, "users", userData.uid), { ...userData });
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
          dispatch(getVocabFromDB());
        }
      });
    } catch (error: unknown) {
      handleFirebaseError(error, dispatch);
    }
  };

// Sign out
export const signOutAuth = (): AppThunk => async (dispatch) => {
  dispatch(setAppLoading(true));
  try {
    await firebaseSignOut(auth);
    dispatch(signOutApp());
    dispatch(resetVocabState());
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
