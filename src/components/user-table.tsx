import { MoreHorizontal, Plus, Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { roleState } from "@/store/atoms/role-state";
import { userState } from "@/store/atoms/user-state";
import { toast } from "sonner";
import useUserRole from "@/hooks/use-user-role";

const UserTable = () => {
  const [users, setUsers] = useRecoilState(userState);
  const roles = useRecoilValue(roleState);
  const role = useUserRole().getRoleFromLocalStorage();
  const isAdmin = role === "Admin";
  const isManager = role === "Manager";
  const [searchQuery, setSearchQuery] = useState("");
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddUser = () => {
    if (!isAdmin) {
      toast.warning("Only admin can create a member");
      return;
    }

    if (
      !newUser.name.length ||
      !newUser.email.length ||
      !newUser.password.length ||
      !newUser.role.length
    ) {
      toast.warning("All fields are required");
      return;
    }
    setUsers([
      ...users,
      { ...newUser, id: users.length + 1, status: "Active" },
    ]);
    setNewUser({ name: "", email: "", role: "", password: "" });
    toast.success("Member Added Successfully");
  };

  const handleChangeRole = (id: number, newRole: string) => {
    if (!isAdmin) {
      toast.warning("Only admin can change role");
      return;
    }

    setUsers(
      users.map((user) => {
        if (user.id === id) {
          return { ...user, role: newRole };
        }
        return user;
      })
    );
    toast.success(`Role changed to ${newRole}`);
  };

  const handleChangeStatus = (id: number) => {
    if (!isAdmin || !isManager) {
      toast.warning("Only admin or manager can change status");
      return;
    }

    setUsers(
      users.map((user) => {
        if (user.id === id) {
          return {
            ...user,
            status: user.status === "Active" ? "Inactive" : "Active",
          };
        }
        return user;
      })
    );
    toast.success("Status Toggled Successfully");
  };

  const handleDeleteUser = (id: number) => {
    if (!isAdmin) {
      toast.warning("Only admin can delete a member");
      return;
    }

    setUsers(users.filter((user) => user.id !== id));
    toast.success("Member Deleted Successfully");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
        <CardDescription>Manage system users and their roles</CardDescription>
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {isAdmin && (
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>
                    Create a new user and assign their role
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={newUser.name}
                      onChange={(e) =>
                        setNewUser({
                          ...newUser,
                          name: e.target.value,
                        })
                      }
                      placeholder="Enter user name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newUser.email}
                      onChange={(e) =>
                        setNewUser({
                          ...newUser,
                          email: e.target.value,
                        })
                      }
                      placeholder="Enter email"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={newUser.password}
                      onChange={(e) =>
                        setNewUser({
                          ...newUser,
                          password: e.target.value,
                        })
                      }
                      placeholder="Enter password"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="role">Role</Label>
                    <Select
                      value={newUser.role}
                      onValueChange={(value) =>
                        setNewUser({
                          ...newUser,
                          role: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role.id} value={role.name}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button onClick={handleAddUser}>Add User</Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{user.role}</Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={user.status === "Active" ? "default" : "secondary"}
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {isAdmin && (
                        <DropdownMenu>
                          <DropdownMenuTrigger className="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:text-accent-foreground w-full">
                            Change Role
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Select Role</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {roles.map((role) => (
                              <DropdownMenuItem
                                key={role.id}
                                onClick={() =>
                                  handleChangeRole(user.id, role.name)
                                }
                              >
                                {role.name}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                      <DropdownMenuItem
                        onClick={() => handleChangeStatus(user.id)}
                      >
                        Change Status
                      </DropdownMenuItem>
                      {isAdmin && (
                        <DropdownMenuItem
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-destructive"
                        >
                          Delete User
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UserTable;
