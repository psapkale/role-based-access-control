"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { AuthStatus } from "@/types";

export default function AuthModal() {
   const [isOpen, setIsOpen] = useState(false);
   const [user, setUser] = useLocalStorage<AuthStatus>("user", {
      name: "",
      email: "",
      role: "",
      password: "",
      isLoggedIn: false,
   });
   const [localUser, setLocalUser] = useState({
      name: "",
      email: "",
      role: "",
      password: "",
      isLoggedIn: false,
   });

   const handleLogin = (e: React.FormEvent) => {
      e.preventDefault();
      setUser({ ...localUser, isLoggedIn: true });
      setLocalUser({
         name: "",
         email: "",
         role: "",
         password: "",
         isLoggedIn: false,
      });
      setIsOpen(false);
   };

   console.log(user, localUser);

   const handleSignUp = (e: React.FormEvent) => {
      e.preventDefault();
      alert("Sign up functionality would be implemented here");
   };

   const handleLogout = () => {
      setUser({ ...user, isLoggedIn: false });
   };

   return (
      <div className="flex flex-col items-center justify-center min-h-[74vh]">
         <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
               <Button variant="outline">Login / Sign Up</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[450px] py-8 px-12">
               <Tabs defaultValue="login" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                     <TabsTrigger value="login">Login</TabsTrigger>
                     <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>
                  <TabsContent value="login">
                     <form onSubmit={handleLogin}>
                        <div className="grid gap-4 py-4">
                           <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                 htmlFor="login-email"
                                 className="text-right"
                              >
                                 Email
                              </Label>
                              <Input
                                 id="login-email"
                                 className="col-span-3"
                                 required
                                 onChange={(e) =>
                                    setLocalUser({
                                       ...localUser,
                                       email: e.target.value,
                                    })
                                 }
                              />
                           </div>
                           <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                 htmlFor="login-password"
                                 className="text-right"
                              >
                                 Password
                              </Label>
                              <Input
                                 id="login-password"
                                 type="password"
                                 className="col-span-3"
                                 required
                                 onChange={(e) =>
                                    setLocalUser({
                                       ...localUser,
                                       password: e.target.value,
                                    })
                                 }
                              />
                           </div>
                        </div>
                        <Button type="submit" className="w-full">
                           Login
                        </Button>
                     </form>
                  </TabsContent>
                  <TabsContent value="signup">
                     <form onSubmit={handleSignUp}>
                        <div className="grid gap-4 py-4">
                           <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                 htmlFor="signup-name"
                                 className="text-right"
                              >
                                 Name
                              </Label>
                              <Input
                                 id="signup-name"
                                 className="col-span-3"
                                 required
                              />
                           </div>
                           <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                 htmlFor="signup-email"
                                 className="text-right"
                              >
                                 Email
                              </Label>
                              <Input
                                 id="signup-email"
                                 type="email"
                                 className="col-span-3"
                                 required
                              />
                           </div>
                           <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                 htmlFor="signup-password"
                                 className="text-right"
                              >
                                 Password
                              </Label>
                              <Input
                                 id="signup-password"
                                 type="password"
                                 className="col-span-3"
                                 required
                              />
                           </div>
                           <div className="grid grid-cols-4 items-center gap-4">
                              <Label
                                 htmlFor="signup-role"
                                 className="text-right"
                              >
                                 Role
                              </Label>
                              <Select
                                 onValueChange={() => {}}
                                 defaultValue={"Admin"}
                              >
                                 <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select a role" />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectItem value="Admin">Admin</SelectItem>
                                    <SelectItem value="User">User</SelectItem>
                                    <SelectItem value="Guest">Guest</SelectItem>
                                 </SelectContent>
                              </Select>
                           </div>
                        </div>
                        <Button type="submit" className="w-full">
                           Sign Up
                        </Button>
                     </form>
                  </TabsContent>
               </Tabs>
            </DialogContent>
         </Dialog>
      </div>
   );
}
