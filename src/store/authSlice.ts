import { auth, db } from "@/services/firebase/firebaseService";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { AppUser } from "@/types/general";
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  UserCredential,
} from "firebase/auth";
import { AppThunk, RootState } from "./store";
import { handleFirebaseError } from "@/lib/firebaseError";

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
    setUser: (state, action: PayloadAction<AppUser>) => {
      state.user = { ...state.user, ...action.payload };
      state.loading = false;
      state.error = "";
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOut: (state) => {
      state.user = null;
    },
  },
});

// Listen for changes in the user's authentication state
export const listenForAuthChanges = (): AppThunk => (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userData: AppUser = {
        email: user.email,
        uid: user.uid,
        displayName: user.displayName,
        emailVerified: user.emailVerified,
      };

      // Retrieve the user data from Firestore and dispatch the setUser action
      const userDocRef = doc(db, "users", userData.uid);
      onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          const userData = doc.data() as AppUser;
          dispatch(setUser(userData));
        }
      });
    } else {
      dispatch(signOut());
    }
  });
};

// Create a new user with email and password
export const createUserAuth =
  (email: string, password: string): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const userCredential: UserCredential =
        await createUserWithEmailAndPassword(auth, email, password);

      const userData: AppUser = {
        email: userCredential.user.email,
        uid: userCredential.user.uid,
        displayName: userCredential.user.displayName || "User",
        emailVerified: userCredential.user.emailVerified,
        userCreatedDate: new Date(),
        userLastSignIn: new Date(),
      };

      // Create a new document for the user in Firestore with the same UID
      const userDocRef = doc(db, "users", userData.uid);
      await setDoc(userDocRef, userData);

      onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          const userData = doc.data() as AppUser;
          dispatch(setUser(userData));
        }
      });
    } catch (error: unknown) {
      const errorMessage = handleFirebaseError(error);
      dispatch(setError(errorMessage.message));
    }
  };

// Sign in with email and password
export const signInAuth =
  (email: string, password: string) => async (dispatch: Dispatch) => {
    dispatch(setLoading(true));

    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(setUser(userCredential.user));
    } catch (error: unknown) {
      const errorMessage = handleFirebaseError(error);
      dispatch(setError(errorMessage.message));
    }
  };

// Sign out
export const signOutAuth = (): AppThunk => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await firebaseSignOut(auth);
    dispatch(authSlice.actions.signOut());
  } catch (error: unknown) {
    const errorMessage = handleFirebaseError(error);
    dispatch(setError(errorMessage.message));
  }
};

export const selectUserSignedIn = (state: RootState) => state.auth.user;
export const selectLoading = (state: { auth: AuthState }) => state.auth.loading;
export const selectError = (state: { auth: AuthState }) => state.auth.error;

export const { setUser, setLoading, setError, signOut } = authSlice.actions;

export default authSlice;
