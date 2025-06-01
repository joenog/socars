import { createContext } from "react";

export interface UserProps {
  uid: string;
  name: string | null;
  email: string | null;
}

export type AuthContextData = {
  signed: boolean;
  loadingAuth: boolean;
  handleInfoUser: ({ uid, name, email }: UserProps) => void;
  user: UserProps | null;
};

export const AuthContext = createContext({} as AuthContextData);