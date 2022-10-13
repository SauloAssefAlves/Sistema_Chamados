import Header from "../../components/Header";
import Title from "../../components/Title";
import { FiPlus } from "react-icons/fi";
import "./new.css";
import { getCollection } from "../../services/firebaseConnection";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import firebase from "../../services/firebaseConnection";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import { getStoreData, updateDocs } from "../../services/firebaseConnection";

export default function New() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loadCustomers, setLoadCustomers] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [customerSelected, setCustomerSelected] = useState(0);
  const [assunto, setAssunto] = useState("Suporte");
  const [status, setStatus] = useState("Aberto");
  const [complemento, setComplemento] = useState("");
  const [idCustomer, setIdCustomer] = useState(false);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function loadCustomers() {
      getCollection("customers")
        .then((res) => {
          let lista = res.map((doc) => {
            return { id: doc.id, nomeEmpresa: doc.nomeEmpresa };
          });

          if (lista.length === 0) {
            console.log("NENHUMA EMPRESA ENCONTRADA");
            setCustomers([{ id: 1, nomeEmpresa: "Freela" }]);
            setLoadCustomers(false);
            return;
          }

          setCustomers(lista);
          setLoadCustomers(false);
          if (id) {
            loadId(lista);
          }
        })
        .catch((err) => {
          setLoadCustomers(false);
          setCustomers([{ id: 1, nomeEmpresa: "" }]);
          console.log("Algo deu Errado ", err);
        });
    }
    loadCustomers();
  }, []);

  async function loadId(lista) {
    await getStoreData("called", id)
      .then((res) => {
        setAssunto(res.data().assunto);
        setStatus(res.data().status);
        setComplemento(res.data().complemento);

        let index = lista.findIndex((item) => item.id == res.data().clienteId);
        setCustomerSelected(index);
        setIdCustomer(true);
      })
      .catch((err) => {
        console.log("Erro no id passado... ", err);
        setIdCustomer(false);
      });
  }

  async function handleRegister(e) {
    e.preventDefault();

    //caso a um id
    if (idCustomer) {
      await updateDocs("called", id, {
        cliente: customers[customerSelected].nomeEmpresa,
        clienteId: customers[customerSelected].id,
        assunto: assunto,
        status: status,
        complemento: complemento,
        userId: user.uid,
      })
        .then((res) => {
          toast.success("Chamado Editado com sucesso");
          setComplemento("");
          setCustomerSelected(0);
          navigate("/dashboard");
        })
        .catch((err) => {
          toast.error("Ops erro ao registrar..");
          console.log(err);
        });
      return;
    }

    const db = getFirestore(firebase);

    await addDoc(collection(db, "called"), {
      created: new Date(),
      cliente: customers[customerSelected].nomeEmpresa,
      clienteId: customers[customerSelected].id,
      assunto: assunto,
      status: status,
      complemento: complemento,
      userId: user.uid,
    })
      .then((res) => {
        toast.success("Chamado cirado com sucesso");
        setComplemento("");
        setCustomerSelected(0);
      })
      .catch((err) => {
        toast.error("Ops.. Erro ao registar.");
        console.log(err);
      });
  }

  function handleSelectChange(e) {
    setAssunto(e.target.value);
  }

  function handleOptionChange(e) {
    setStatus(e.target.value);
  }

  function handleChangeCustomers(e) {
    setCustomerSelected(e.target.value);
  }

  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Novo chamado">
          <FiPlus size={25} />
        </Title>
        <div className="container">
          <form className="form-profile " onSubmit={handleRegister}>
            <label>Cliente</label>
            {loadCustomers ? (
              <input disabled type="text" value="Carregando clientes..." />
            ) : (
              <select value={customerSelected} onChange={handleChangeCustomers}>
                {customers.map((item, index) => {
                  return (
                    <option key={item.id} value={index}>
                      {item.nomeEmpresa}
                    </option>
                  );
                })}
              </select>
            )}

            <label>Assunto</label>
            <select value={assunto} onChange={handleSelectChange}>
              <option value="Suporte">Suporte</option>
              <option value="Visita Tecnica">Visita Tecnica</option>
              <option value="Financeiro">Financeiro</option>
            </select>
            <label>Status</label>
            <div className="status">
              <input
                type="radio"
                name="radio"
                id="Aberto"
                value="Aberto"
                onChange={handleOptionChange}
                checked={status === "Aberto"}
              />
              <label htmlFor="Aberto">Em Aberto</label>
              <input
                type="radio"
                name="radio"
                id="Progresso"
                value="Progresso"
                onChange={handleOptionChange}
                checked={status === "Progresso"}
              />
              <label htmlFor="Progresso">Em Progresso</label>
              <input
                type="radio"
                name="radio"
                id="Atendido"
                value="Atendido"
                onChange={handleOptionChange}
                checked={status === "Atendido"}
              />
              <label htmlFor="Atendido">Atendido</label>
            </div>

            <label>Complemento</label>
            <textarea
              value={complemento}
              type="text"
              placeholder="Escreva seu problema..."
              onChange={(e) => {
                setComplemento(e.target.value);
              }}
            />
            <button type="submit">Registrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
