import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";

function SignUp() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUp, loadingAuth } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();

    if (nome !== "" && email !== "" && password !== "") {
      signUp(email, password, nome);
    }
  }

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img alt="Sistema Logo" />
        </div>
        <form onSubmit={handleSubmit}>
          <h1>Cadastrar Conta</h1>
          <input
            type="text"
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="text"
            placeholder="email.@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="**********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">
            {loadingAuth ? "Carregando..." : "Cadastrar"}
          </button>
        </form>

        <a href="/">Já tem uma conta? Entre</a>
      </div>
    </div>
  );
}

export default SignUp;
