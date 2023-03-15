import { listenForAuthChanges } from "@/store/slices/authSlice";
import { getVocabDB } from "@/store/slices/vocabSlice";
import { AppDispatch } from "@/store/store";
import { AppUser } from "@/types/general";
import { useEffect, useState } from "react";
import useUserCookie from "./useUserCookie";

const useFetchVocabAndAuthChanges = (
  dispatch: AppDispatch,
  currentUser: AppUser | null
) => {
  const { setUserCookie, getUserCookie } = useUserCookie();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const fetchData = (uid: string) => {
      dispatch(getVocabDB(uid));
    };

    const unsubscribe = listenForAuthChanges(setUserCookie)(dispatch);

    if (currentUser) {
      setUserCookie(currentUser);
      fetchData(currentUser.uid);
    } else {
      const user = getUserCookie();
      if (user) {
        fetchData(user.uid);
      }
    }

    setInitialized(true);

    // Cleanup function that will remove the listener for auth changes
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return { initialized };
};

export default useFetchVocabAndAuthChanges;
