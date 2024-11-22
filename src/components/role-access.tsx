import { useRecoilState } from "recoil";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { roleState } from "@/store/atoms/role-state";
import useUserRole from "@/hooks/use-user-role";

const RoleAccess = () => {
  const [roles, setRoles] = useRecoilState(roleState);
  const role = useUserRole().getRoleFromLocalStorage();
  const isAdmin = role === "Admin";
  const isManager = role === "Manager";

  const handleUpdateRolePermissions = (
    roleName: string,
    permission: string
  ) => {
    setRoles(
      roles.map((role) => {
        if (role.name === roleName) {
          const updatedPermissions = role.permissions.includes(permission)
            ? role.permissions.filter((p) => p !== permission)
            : [...role.permissions, permission];
          return { ...role, permissions: updatedPermissions };
        }
        return role;
      })
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Role Permissions</CardTitle>
        <CardDescription>Configure permissions for each role</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {roles.map((role) => (
            <div key={role.id} className="space-y-2">
              <h3 className="font-medium">{role.name}</h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {["create", "read", "update", "delete"].map((permission) => (
                  <div key={permission} className="flex items-center space-x-2">
                    <Checkbox
                      disabled={
                        (!isAdmin && !isManager) ||
                        (role.name === "Admin" && !isAdmin)
                      }
                      id={`${role.name}-${permission}`}
                      checked={role.permissions.includes(permission)}
                      onCheckedChange={() =>
                        handleUpdateRolePermissions(role.name, permission)
                      }
                    />
                    <Label htmlFor={`${role.name}-${permission}`}>
                      {permission}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RoleAccess;
