import { FormEvent, useEffect, useState } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../service/firebase";
import { useNavigate } from "react-router-dom";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  function handleLogin(e: FormEvent) {
    e.preventDefault();
    if (email === "" || password === "") {
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/cadastro", { replace: true });
        console.log("logado");
      })
      .catch((error) => {
        console.log("Erro ao tentar logar" + error);
        alert("Email ou senha invalido!");
      });
    setEmail("");
    setPassword("");
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/cadastro");
      }
    });
  }, [navigate]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-11/12 max-w-3xl">
        <h1 className="md:text-3xl mb-4 bg-gradient-to-r from-orange-800 to-orange-400 bg-clip-text text-transparent font-bold text-2xl flex items-end">
          <span className="md:text-5xl font-orbitron text-4xl font-bold text-white mr-4">
            Blog
          </span>
          Análise Simplificada
        </h1>
        <form className="flex flex-col w-full gap-2" onSubmit={handleLogin}>
          <label className="text-white">Email:</label>
          <input
            type="email"
            className="w-full placeholder-slate-400  py-2 px-2 rounded-sm outline-none"
            placeholder="Digite seu email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="text-white">Password:</label>
          <input
            type="password"
            className="w-full placeholder-slate-400 py-2 px-2 rounded-sm outline-none mb-4"
            placeholder="Password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 rounded-sm"
          >
            Acessar
          </button>
        </form>
      </div>
    </div>
  );
}
