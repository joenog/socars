import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase/firebaseConnection";
import { FiLogOut } from "react-icons/fi";

export default function DashboardHeader() {
  async function handleLogOut() {
    await signOut(auth);
  }

  return (
    <div className=" w-ful flex items-center justify-start gap-4 px-3 rounded-md py-1 bg-blue-200 mb-4">
      <Link to={"/dashboard"}>Dashboard</Link>
      <Link to={"/dashboard/new"}>Novo Carro</Link>

      <button
        className="ml-auto flex items-center gap-1 p-1 cursor-pointer rounded-sm "
        onClick={() => handleLogOut()}
      >
        Sair <FiLogOut />
      </button>
    </div>
  );
}
