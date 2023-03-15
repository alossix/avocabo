import { listenForAuthChanges } from "@/store/slices/authSlice";
import { getVocabDB } from "@/store/slices/vocabSlice";
import { AppDispatch } from "@/store/store";
import { AppUser } from "@/types/general";
import { useEffect, useRef, useState } from "react";
import useUserCookie from "./useUserCookie";

const useFetchVocabAndAuthChanges = (
  dispatch: AppDispatch,
  currentUser: AppUser | null
) => {
  console.log(`in first useeffect`);
  const { setUserCookie, getUserCookie } = useUserCookie();
  const [initialized, setInitialized] = useState(false);
  const fetchedVocab = useRef(false);

  useEffect(() => {
    const unsubscribe = listenForAuthChanges(setUserCookie)(dispatch);

    setInitialized(true);

    // Cleanup function that will remove the listener for auth changes
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    const fetchData = (uid: string) => {
      if (!fetchedVocab.current) {
        dispatch(getVocabDB(uid));
        fetchedVocab.current = true;
      }
    };

    if (currentUser) {
      setUserCookie(currentUser);
      fetchData(currentUser.uid);
    } else {
      const user = getUserCookie();
      if (user) {
        fetchData(user.uid);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, getUserCookie]);

  return { initialized };
};

export default useFetchVocabAndAuthChanges;
