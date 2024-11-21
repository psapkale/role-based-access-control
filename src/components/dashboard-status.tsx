import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Shield, Users } from "lucide-react";
import { useRecoilValue } from "recoil";
import { userState } from "@/store/atoms/user-state";
import { roleState } from "@/store/atoms/role-state";

const DashboardStatus = () => {
  const users = useRecoilValue(userState);
  const roles = useRecoilValue(roleState);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{users.length}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Active Roles</CardTitle>
          <Shield className="w-4 h-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{roles.length}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStatus;
