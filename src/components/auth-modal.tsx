"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRecoilValue } from "recoil";
import { roleState } from "@/store/atoms/role-state";
import useUserRole from "@/hooks/use-user-role";

export default function AuthModal() {
  const [isOpen, setIsOpen] = useState(false);
  const roles = useRecoilValue(roleState);
  //   const [role, setRole] = useState("Admin");
  const { isLoggedIn, setRoleInLocalStorage } = useUserRole();

  const handleLogin = (role: string) => {
    setRoleInLocalStorage(role);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[74vh]">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Login / Sign Up</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[450px] py-8 px-12">
          <DialogHeader>
            <DialogTitle>Temporary Login As:</DialogTitle>
            <DialogDescription>
              Access the features according to the role
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="default-login" className="w-full">
            <TabsContent value="default-login" className="grid gap-2 my-6">
              {roles.map((role) => (
                <Button
                  key={role.id}
                  type="submit"
                  variant={"ghost"}
                  onClick={() => handleLogin(role.name)}
                >
                  {role.name}
                </Button>
              ))}
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}
