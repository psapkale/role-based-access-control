import React from "react";
import { Button } from "./ui/button";
import useUserRole from "@/hooks/use-user-role";
// import { localMemberData } from "@/lib/use-local-member";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { clearRoleFromLocalStorage } = useUserRole();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">
            Manage users and their access permissions
          </p>
        </div>

        <Button variant={"ghost"} onClick={clearRoleFromLocalStorage}>
          Logout
        </Button>
      </div>

      {children}
    </div>
  );
};

export default Layout;
