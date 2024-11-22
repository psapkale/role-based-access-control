import { loginState } from "@/store/atoms/login-state";
import { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";

const useUserRole = () => {
  const [role, setRole] = useState(() => localStorage.getItem("role"));
  const setIsLoggedIn = useSetRecoilState(loginState);

  const setRoleInLocalStorage = (newRole: string) => {
    localStorage.setItem("role", newRole);
    setRole(newRole);
    setIsLoggedIn(true);
  };

  const clearRoleFromLocalStorage = () => {
    localStorage.removeItem("role");
    setRole(null);
    setIsLoggedIn(false);
  };

  const getRoleFromLocalStorage = () => {
    return localStorage.getItem("role");
  };

  useEffect(() => {
    const onStorageChange = () => {
      const storedRole = localStorage.getItem("role");
      setRole(storedRole);
      setIsLoggedIn(!!storedRole);
    };

    window.addEventListener("storage", onStorageChange);

    return () => {
      window.removeEventListener("storage", onStorageChange);
    };
  }, []);

  return {
    role,
    setRoleInLocalStorage,
    clearRoleFromLocalStorage,
    getRoleFromLocalStorage,
  };
};

export default useUserRole;
