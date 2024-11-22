import React from "react";
import { Button } from "./ui/button";
import useUserRole from "@/hooks/use-user-role";
import { Badge } from "./ui/badge";
import { useRecoilValue } from "recoil";
import { loginState } from "@/store/atoms/login-state";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = useRecoilValue(loginState);
  const { getRoleFromLocalStorage, clearRoleFromLocalStorage } = useUserRole();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">
            Manage users and their access permissions
          </p>
        </div>

        {isLoggedIn && (
          <div className="flex gap-4">
            <span className="flex gap-2 items-center">
              <span className="text-sm text-muted-foreground">
                Current session as:
              </span>
              <Badge>{getRoleFromLocalStorage()}</Badge>
            </span>
            <Button variant={"ghost"} onClick={clearRoleFromLocalStorage}>
              Logout
            </Button>
          </div>
        )}
      </div>

      {children}
    </div>
  );
};

export default Layout;
