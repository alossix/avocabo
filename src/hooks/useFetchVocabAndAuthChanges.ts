import { useAppSelector } from "@/store/hooks";
import {
  listenForAuthChanges,
  selectUserSignedIn,
} from "@/store/slices/authSlice";
import { getVocabDB } from "@/store/slices/vocabSlice";
import { useAppDispatch } from "@/store/store";
import { useEffect, useRef, useState } from "react";
import useUserCookie from "./useUserCookie";

const useFetchVocabAndAuthChanges = () => {
  const { setUserCookie, getUserCookie } = useUserCookie();
  const [initialized, setInitialized] = useState(false);
  const currentUser = useAppSelector(selectUserSignedIn);
  const dispatch = useAppDispatch();
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
        dispatch(getVocabDB({ userId: uid }));
        fetchedVocab.current = true;
      }
    };

    if (currentUser) {
      setUserCookie(currentUser);
      fetchData(currentUser.uid);
    } else if (!fetchedVocab.current) {
      const user = getUserCookie();
      if (user) {
        fetchData(user.uid);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return { initialized };
};

export default useFetchVocabAndAuthChanges;
