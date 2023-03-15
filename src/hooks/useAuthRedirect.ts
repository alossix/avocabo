import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth, onAuthStateChanged } from "@/services/firebase/firebaseService";

export const useAuthRedirect = ({
  redirectTo,
  authRequired,
}: {
  redirectTo: string;
  authRequired: boolean;
}) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (authRequired) {
          setLoading(false);
        } else {
          router.push(redirectTo);
        }
      } else {
        if (authRequired) {
          router.push(redirectTo);
        } else {
          setLoading(false);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [router, redirectTo, authRequired]);

  return { loading };
};
