import "./customers.css";
import { FiUser } from "react-icons/fi";
import Tilte from "../../components/Title";
import Header from "../../components/Header";
import { useState } from "react";
import { StoreData } from "../../services/firebaseConnection";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import firebase from "../../services/firebaseConnection";
import { toast } from "react-toastify";

export default function Customers() {
  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [endereco, setEndereco] = useState("");

  async function handleAdd(e) {
    e.preventDefault();
    const db = getFirestore(firebase);

    if (nomeEmpresa !== "" && cnpj !== "" && endereco !== "") {
      await addDoc(collection(db, "customers"), {
        nomeEmpresa: nomeEmpresa,
        cnpj: cnpj,
        endereco: endereco,
      })
        .then(() => {
          setNomeEmpresa("");
          setCnpj("");
          setEndereco("");

          toast.info("Empresa Cadastrada com sucesso");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Erro ao cadastrar essa empresa");
        });
    } else {
      toast.error("Preencha todos os campos");
    }
  }

  return (
    <div>
      <Header />
      <div className="content">
        <Tilte name="Clientes">
          <FiUser size={25} />
        </Tilte>
        <div className="container">
          <form className="form-profile customers" onSubmit={handleAdd}>
            <label>Nome do cliente</label>
            <input
              type="text"
              value={nomeEmpresa}
              onChange={(e) => {
                setNomeEmpresa(e.target.value);
              }}
              placeholder="Nome da sua Empresa"
            />
            <label>Cnpj</label>
            <input
              type="number"
              value={cnpj}
              onChange={(e) => {
                setCnpj(e.target.value);
              }}
              placeholder="Seu Cnpj"
            />
            <label>Endereço</label>
            <input
              type="text"
              value={endereco}
              onChange={(e) => {
                setEndereco(e.target.value);
              }}
              placeholder="Endereço da empresa"
            />

            <button type="submit">Cadastrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
