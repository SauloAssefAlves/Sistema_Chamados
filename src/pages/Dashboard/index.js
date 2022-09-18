import { useContext } from "react";

import { AuthContext } from "../../contexts/auth";

function Dashboard() {
  const { signOut } = useContext(AuthContext);
  return (
    <div>
      <h1>PAGINA DASHBOARsassD</h1>
      <button onClick={() => signOut()}>Fazer logout</button>
    </div>
  );
}

export default Dashboard;
