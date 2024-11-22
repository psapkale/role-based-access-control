import useUserRole from "@/hooks/use-user-role";
import RoleAccess from "./role-access";
import RoleList from "./role-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import UserTable from "./user-table";

const UserAndRoleContent = () => {
  const role = useUserRole().getRoleFromLocalStorage();
  const isAdmin = role === "Admin";
  const isManager = role === "Manager";

  return (
    <Tabs defaultValue="users" className="space-y-4">
      <TabsList>
        <TabsTrigger value="users">Users</TabsTrigger>
        <TabsTrigger value="roles">Roles</TabsTrigger>
      </TabsList>

      <TabsContent value="users" className="space-y-4">
        {/* Users */}
        <UserTable />
      </TabsContent>

      <TabsContent value="roles" className="space-y-4">
        {/* Roles */}
        <RoleList />
        {/* Roles access */}
        <RoleAccess />
      </TabsContent>
    </Tabs>
  );
};

export default UserAndRoleContent;
