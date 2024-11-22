export interface UserDataProps {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  status: string;
}

export interface RoleDataProps {
  id: number;
  name: string;
  description: string;
  permissions: string[];
}

export interface AuthStatus {
  name: string;
  email: string;
  role: string;
}
