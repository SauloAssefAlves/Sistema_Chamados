import { useState, UseEffect, createContext, useEffect } from "react";
import firebase, { fireStore } from "../services/firebaseConnection";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


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
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }

      setLoading(false);
    }

    loadStorage();

    //vai buscar no localstore se existir um usuario logado ja.
  }, []);

  async function signUp(email, password, nome) {
    setLoadingAuth(true);

    //crinado a conta no firebase.
    const auth =  getAuth(firebase);

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        //uid é o id gerado pelo firebase.

        let uid = res.user.uid;
        console.log(uid);
        //inserindo as informacoes do usuario na collection(table) users no id 'uid'
        await fireStore("users", uid, { nome: nome, avatarUrl: null }).then(
          () => {
            let data = {
              uid: uid,
              nome: nome,
              email: res.user.email,
              avatarUrl: null,
            };
            
            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
          }
        );
      })
      .catch((err) => {
        console.log(err);
        setLoadingAuth(false);
      });
  }

  function storageUser(data) {
    localStorage.setItem("SistemaUser", JSON.stringify(data));
  }

  return (
    //Se user estiver null, "!!user" vai receber false, se user tiver algum objeto nele "!!user" vai receber true.
    <AuthContext.Provider value={{ signed: !!user, user, loading, signUp }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
