import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">
            Manage users and their access permissions
          </p>
        </div>
      </div>

      {children}
    </div>
  );
};

export default Layout;
