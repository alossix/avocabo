import { handleAppError } from "@/lib/handleAppError";
import { auth, onSnapshot } from "@/services/firebase/firebaseService";
import {
  getUserDocRef,
  setAppError,
  setAppUser,
} from "@/store/slices/authSlice";
import { getVocabDB } from "@/store/slices/vocabSlice";
import { useAppDispatch } from "@/store/store";
import { AppUser } from "@/types/general";
import { useEffect, useRef, useState } from "react";
import useUserCookie from "./useUserCookie";

const useFetchVocabAndAuthChanges = () => {
  const { setUserCookie } = useUserCookie();
  const [initialized, setInitialized] = useState(false);
  const dispatch = useAppDispatch();
  const snapshotUnsubscribe = useRef<(() => void) | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const unsubscribeVocabRef = useRef<() => void>(() => {});

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const userDocRef = getUserDocRef({ uid: user.uid });
          // Unsubscribe from the previous snapshot listener
          if (snapshotUnsubscribe.current) {
            snapshotUnsubscribe.current();
          }
          snapshotUnsubscribe.current = onSnapshot(userDocRef, (doc) => {
            if (doc.exists()) {
              const userData = doc.data() as AppUser;
              dispatch(setAppUser({ user: userData }));
              setUserCookie(userData);
            }
          });

          if (!fetchedVocab.current) {
            const unsubscribeVocab = await dispatch(
              getVocabDB({ userId: user.uid })
            );
            unsubscribeVocabRef.current = unsubscribeVocab;
            fetchedVocab.current = true;
          }

          setInitialized(true);
        } catch (error: unknown) {
          const { message } = handleAppError(error);
          dispatch(setAppError(message));
        }
      } else {
        setUserCookie(null);
        fetchedVocab.current = false;
        if (snapshotUnsubscribe.current) {
          snapshotUnsubscribe.current();
        }
        if (unsubscribeVocabRef.current) {
          unsubscribeVocabRef.current();
        }
        setInitialized(true);
      }
    });

    return () => {
      unsubscribeAuth();
      if (snapshotUnsubscribe.current) {
        snapshotUnsubscribe.current();
      }
      if (unsubscribeVocabRef.current) {
        unsubscribeVocabRef.current();
      }
    };
  }, [dispatch, setUserCookie]);

  const fetchedVocab = useRef(false);

  return { initialized };
};

export default useFetchVocabAndAuthChanges;
