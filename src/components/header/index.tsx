import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import logoImg from "../../assets/socars-logo.png";
import { FiUser, FiLogIn } from "react-icons/fi";

export default function Header() {
  const { signed, loadingAuth, user } = useContext(AuthContext);

  return (
    <div className="w-full fixed flex justify-center items-center bg-white drop-shadow-sm drop-shadow-gray-200 mb-4 z-50">
      <header className="w-full max-w-7xl items-center flex justify-between p-4 mx-2">
        <Link to={"/"}>
          <img className="w-30 mt-1" src={logoImg} alt="logo-site" />
        </Link>
        {!loadingAuth && signed && (
          <Link className="flex gap-3" to={"/dashboard"}>
            {user?.name} <FiUser size={25} />
          </Link>
        )}

        {!loadingAuth && !signed && (
          <Link to={"/dashboard"}>
            <FiLogIn size={25} />
          </Link>
        )}
      </header>
    </div>
  );
}
