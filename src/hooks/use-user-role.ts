import { loginState } from "@/store/atoms/login-state";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

const useUserRole = () => {
  const setIsLoggedIn = useSetRecoilState(loginState);

  const setRoleInLocalStorage = (newRole: string) => {
    localStorage.setItem("role", newRole);
    setIsLoggedIn(true);
  };

  const clearRoleFromLocalStorage = () => {
    localStorage.removeItem("role");
    setIsLoggedIn(false);
  };

  const getRoleFromLocalStorage = () => {
    return localStorage.getItem("role");
  };

  useEffect(() => {
    const onStorageChange = () => {
      const storedRole = localStorage.getItem("role");
      setIsLoggedIn(!!storedRole);
    };

    window.addEventListener("storage", onStorageChange);

    return () => {
      window.removeEventListener("storage", onStorageChange);
    };
  }, []);

  return {
    setRoleInLocalStorage,
    clearRoleFromLocalStorage,
    getRoleFromLocalStorage,
  };
};

export default useUserRole;
