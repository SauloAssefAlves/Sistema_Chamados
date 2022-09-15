import { useState, UseEffect, createContext, useEffect } from "react";
import firebase from "../services/firebaseConnection";

//usado para criar o contexto para depois poder pega-lo
export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function loadStorage() {
      const storageUser = localStorage.getItem("SistemaUser");
      if (storageUser) {
        setUser(JSON.parese(storageUser));
        setLoading(false);
      }

      setLoading(false);
    }

    loadStorage();

    //vai buscar no localstore se existir um usuario logado ja.
  }, []);

  return (
    //Se user estiver null, "!!user" vai receber false, se user tiver algum objeto nele "!!user" vai receber true.
    <AuthContext.Provider value={{ signed: !!user, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
