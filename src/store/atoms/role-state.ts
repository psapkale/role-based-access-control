import { atom } from "recoil";

export const roleState = atom({
  key: "roleState",
  default: [
    {
      id: 1,
      name: "Admin",
      description: "Full access to all features",
      permissions: ["create", "read", "update", "delete"],
    },
    {
      id: 2,
      name: "Manager",
      description: "Can manage most features",
      permissions: ["create", "read", "update"],
    },
    {
      id: 3,
      name: "User",
      description: "Basic access",
      permissions: ["read"],
    },
  ],
});
