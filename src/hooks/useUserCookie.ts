import { AppUser } from "@/types/general";
import Cookies from "js-cookie";
import { useCallback } from "react";

const useUserCookie = () => {
  const setUserCookie = useCallback((user: AppUser | null) => {
    const essentialUserData = {
      uid: user?.uid,
      interfaceLanguage: user?.interfaceLanguage,
    };
    Cookies.set("currentUser", JSON.stringify(essentialUserData), {
      expires: 30, // 30 days
      path: "/",
      sameSite: "lax",
    });
  }, []);

  const getUserCookie = () => {
    const userCookie = Cookies.get("currentUser");
    return userCookie ? JSON.parse(userCookie) : null;
  };

  return { setUserCookie, getUserCookie };
};

export default useUserCookie;
