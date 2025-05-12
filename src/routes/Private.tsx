import { useContext, type ReactNode } from "react";
import { AuthContext } from "../components/context/AuthContext";
import { Navigate } from "react-router-dom";

interface PrivateProps {
  children: ReactNode;
}

export function Private({ children }: PrivateProps) {
  const { loadingAuth, signed } = useContext(AuthContext);

  if(loadingAuth) {
    return <div>CARREGANDO ...</div>
  }

  if(!signed) {
    return <Navigate to={"/login"}/>
  }

  return children;
}