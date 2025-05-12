import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebase/firebaseConnection";

interface AuthProviderProps {
  children: ReactNode;
}

type AuthContextData = {
  signed: boolean;
  loadingAuth: boolean;
  handleInfoUser: ({ uid, name, email }: UserProps) => void;
  user: UserProps | null;
};

interface UserProps {
  uid: string;
  name: string | null;
  email: string | null;
}

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loadingAuth, setLoagindAuth] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          name: user?.displayName,
          email: user?.email,
        });
        setLoagindAuth(false);
      } else {
        setUser(null);
        setLoagindAuth(false);
      }
    });

    return () => {
      unsub();
    };
  }, []);

  function handleInfoUser({ uid, name, email }: UserProps) {
    setUser({
      uid: uid,
      name: name,
      email: email,
    });
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        loadingAuth,
        handleInfoUser,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
