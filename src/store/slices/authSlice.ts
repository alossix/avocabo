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
import { AppUser } from "@/types/general";
import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { UserCredential } from "firebase/auth";

import { AppThunk, RootState } from "../store";

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
    setAppVocab: (state, action) => {
      if (state.user) {
        state.user.vocab = action.payload;
      }
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
        vocab: initialVocab,
      };

      dispatch(setAppUser({ user: userData }));

      // Create a new document for the user in Firestore with the same UID
      await setDoc(doc(db, "users", userData.uid), { ...userData });
      console.log({ userData });

      // Save the initial vocabulary list to Firestore for the user
      // const vocabRef = collection(db, "users", userData.uid, "vocab");
      // const initialVocabData = initialVocab.map((vocab) => ({
      //   ...vocab,
      //   ...initialVocabProperties,
      //   createdAt: serverTimestamp(),
      // }));
      // initialVocabData.forEach(async (vocab) => {
      //   await addDoc(vocabRef, vocab);
      // });

      // Listen for changes to the vocabulary list and update the user data
      // onSnapshot(vocabRef, (querySnapshot) => {
      //   const vocabList: Vocab[] = [];
      //   querySnapshot.forEach((doc) => {
      //     if (doc.exists()) {
      //       const vocabData = doc.data() as Vocab;
      //       vocabList.push(vocabData);
      //     }
      //   });
      //   console.log(`vocablist: ${vocabList}`)
      //   dispatch(setAppVocab(vocabList));
      // });
    } catch (error: unknown) {
      const errorMessage = handleFirebaseError(error);
      console.log(error);
      dispatch(setAppError(errorMessage.message));
    }
  };

// Sign in with email and password
export const signInAuth =
  (email: string, password: string) => async (dispatch: Dispatch) => {
    dispatch(setAppLoading(true));

    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Retrieve the user data from Firestore and dispatch the setUser action
      const userDocRef = doc(db, "users", userCredential.user.uid);
      console.log({ userDocRef });
      onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          const userData = doc.data() as AppUser;
          dispatch(setAppUser({ user: userData }));
          if (userData.vocab) {
            dispatch(setAppVocab(userData.vocab));
          }
        }
      });
    } catch (error: unknown) {
      const errorMessage = handleFirebaseError(error);
      dispatch(setAppError(errorMessage.message));
    }
  };

// Sign out
export const signOutAuth = (): AppThunk => async (dispatch) => {
  dispatch(setAppLoading(true));
  try {
    await firebaseSignOut(auth);
    dispatch(authSlice.actions.signOutApp());
  } catch (error: unknown) {
    const errorMessage = handleFirebaseError(error);
    dispatch(setAppError(errorMessage.message));
  }
};

export const selectUserSignedIn = (state: RootState) => state.auth.user;
export const selectLoading = (state: { auth: AuthState }) => state.auth.loading;
export const selectError = (state: { auth: AuthState }) => state.auth.error;

export const {
  setAppUser,
  setAppLoading,
  setAppError,
  signOutApp,
  setAppVocab,
} = authSlice.actions;

export default authSlice;
