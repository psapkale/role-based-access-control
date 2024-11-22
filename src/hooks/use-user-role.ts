import { useState, useEffect } from "react";

const useUserRole = () => {
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [isLoggedIn, setIsLoggedIn] = useState(!!role);

  const setRoleInLocalStorage = (newRole: string) => {
    if (["Admin", "Manager", "User"].includes(newRole)) {
      localStorage.setItem("role", newRole);
      setRole(newRole);
      setIsLoggedIn(true);
    } else {
      console.error("Invalid role");
    }
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
    console.log("isLoggedIn status:", isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    setIsLoggedIn(!!role);
  }, [role]);

  return {
    role,
    isLoggedIn,
    setRoleInLocalStorage,
    clearRoleFromLocalStorage,
    getRoleFromLocalStorage,
  };
};

export default useUserRole;
