import { AppUser } from "@/types/general";
import Cookies from "js-cookie";

const useUserCookie = () => {
  const setUserCookie = (user: AppUser) => {
    Cookies.set("currentUser", JSON.stringify(user), {
      expires: 30, // 30 days
      path: "/",
      sameSite: "lax",
    });
  };

  const getUserCookie = () => {
    const userCookie = Cookies.get("currentUser");
    return userCookie ? JSON.parse(userCookie) : null;
  };

  return { setUserCookie, getUserCookie };
};

export default useUserCookie;
