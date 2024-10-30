import { signOut } from "firebase/auth";
import { RiLogoutBoxFill } from "react-icons/ri";
import { auth } from "../../service/firebase";

export function Header() {
  async function handleSignOut() {
    await signOut(auth);
  }
  return (
    <header className="w-11/12 max-w-5xl py-5 flex m-auto justify-between">
      <div className="w-full m-auto flex justify-center items-start flex-col mb-4">
        <span className="md:text-5xl font-orbitron text-4xl font-bold text-white">
          Blog
        </span>
        <h1 className="md:text-4xl text-3xl font-bold bg-gradient-to-r from-orange-800 to-orange-500 bg-clip-text text-transparent">
          Analise Simplificada
        </h1>
      </div>
      <button
        className="text-white  flex flex-col items-center justify-center"
        onClick={handleSignOut}
      >
        <RiLogoutBoxFill size={40} color="white" />
        Logout
      </button>
    </header>
  );
}
