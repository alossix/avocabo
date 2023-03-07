import { auth } from "@/services/firebase/firebaseService";
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

interface AuthState {
  user: AppUser | null;
  loading: boolean;
  error: string;
}

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
export const listenForAuthChanges = (): AppThunk => (dispatch, getState) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userData: AppUser = {
        email: user.email,
        uid: user.uid,
        displayName: user.displayName,
        emailVerified: user.emailVerified,
      };
      // Only dispatch the action if the user data has changed
      if (
        JSON.stringify(userData) !==
        JSON.stringify(selectUserSignedIn(getState()))
      ) {
        dispatch(setUser(userData));
      }
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
      dispatch(
        setUser({
          email: userCredential.user.email,
          uid: userCredential.user.uid,
          displayName: userCredential.user.displayName,
          emailVerified: userCredential.user.emailVerified,
          userCreatedDate: new Date(),
          userLastSignIn: new Date(),
        })
      );
    } catch (error) {
      if (error instanceof Error) {
        if (error.message) {
          dispatch(setError(error.message));
        } else {
          dispatch(setError("An unknown error occurred."));
        }
      } else {
        console.error("Unexpected error type:", error);
      }
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
    } catch (error) {
      if (error instanceof Error) {
        if (error.message) {
          dispatch(setError(error.message));
        } else {
          dispatch(setError("An unknown error occurred."));
        }
      } else {
        console.error("Unexpected error type:", error);
      }
    }
  };

// Sign out
export const signOutAuth = (): AppThunk => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await firebaseSignOut(auth);
    dispatch(authSlice.actions.signOut());
  } catch (error) {
    if (error instanceof Error) {
      if (error.message) {
        dispatch(setError(error.message));
      } else {
        dispatch(setError("An unknown error occurred."));
      }
    } else {
      console.error("Unexpected error type:", error);
    }
  }
};

export const selectUserSignedIn = (state: RootState) => state.auth.user;
export const selectLoading = (state: { auth: AuthState }) => state.auth.loading;
export const selectError = (state: { auth: AuthState }) => state.auth.error;

export const { setUser, setLoading, setError, signOut } = authSlice.actions;

export default authSlice;
