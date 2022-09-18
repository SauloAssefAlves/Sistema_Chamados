import { useState, UseEffect, createContext, useEffect } from "react";
import firebase, {
  StoreData,
  getStoreData,
} from "../services/firebaseConnection";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

//usado para criar o contexto para depois poder pega-lo
export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(firebase);

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

  //Login do usuario
  async function signIn(email, password) {
    setLoadingAuth(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        let uid = res.user.uid;

        const userProfile = await getStoreData("users", uid);

        let data = {
          uid: uid,
          nome: userProfile.data().nome,
          avatarUrl: userProfile.data().avatarUrl,
          email: res.user.email,
        };
        setUser(data);
        storageUser(data);
        setLoadingAuth(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingAuth(false);
      });
  }

  //Cadastar novo usuario
  async function signUp(email, password, nome) {
    setLoadingAuth(true);

    //crinado a conta no firebase.

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
        //uid é o id gerado pelo firebase.

        let uid = res.user.uid;
        console.log(uid);
        //inserindo as informacoes do usuario na collection(table) users no id 'uid'
        await StoreData("users", uid, { nome: nome, avatarUrl: null }).then(
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

  //Armazenar as informacoes do ususario no local storage
  function storageUser(data) {
    localStorage.setItem("SistemaUser", JSON.stringify(data));
  }

  //Fazer logout no usuario
  async function signOut() {
    await auth.signOut();
    localStorage.removeItem("SistemaUser");
    setUser(null);
  }

  return (
    //Se user estiver null, "!!user" vai receber false, se user tiver algum objeto nele "!!user" vai receber true.
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        signUp,
        signOut,
        signIn,
        loadingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
