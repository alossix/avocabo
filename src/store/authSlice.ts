/* eslint-disable @typescript-eslint/ban-types */

import { auth } from "@/services/firebase/firebaseService";
import {
  AnyAction,
  createSlice,
  PayloadAction,
  ThunkDispatch,
} from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  User,
  UserCredential,
} from "firebase/auth";
import { AppThunk } from "./store";

interface AuthState {
  user: Partial<User> | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Partial<User>>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
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
export const listenForAuthChanges =
  () => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
      } else {
        dispatch(signOut());
      }
    });
  };

// Create a new user with email and password
export const createUser =
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
        })
      );
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError(error.message));
      } else {
        console.error("Unexpected error type:", error);
      }
      throw error;
    }
  };
// Sign in with email and password
export const signIn =
  (email: string, password: string) =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
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
        dispatch(setError(error.message));
      } else {
        console.error("Unexpected error type:", error);
      }
    }
  };

// Sign out
export const signOut =
  () => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch(setLoading(true));

    try {
      await auth.signOut();
      dispatch(authSlice.actions.signOut());
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError(error.message));
      } else {
        console.error("Unexpected error type:", error);
      }
    }
  };

export const selectUser = (state: { auth: AuthState }) =>
  state.auth.user?.email;
export const selectLoading = (state: { auth: AuthState }) => state.auth.loading;
export const selectError = (state: { auth: AuthState }) => state.auth.error;

export const { setUser, setLoading, setError } = authSlice.actions;

export default authSlice;
