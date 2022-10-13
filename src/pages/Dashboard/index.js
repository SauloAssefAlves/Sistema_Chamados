import { useState, useEffect } from "react";
import "./dashboard.css";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { getCollection } from "../../services/firebaseConnection";
import { format } from "date-fns";
import Modal from "../../components/Modal";

function Dashboard() {
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [datail, setDatail] = useState();

  useEffect(() => {
    async function loadChamados() {
      await getCollection("called", ["created", "desc"], 50)
        .then((res) => {
          updadeState(res);
        })
        .catch((err) => {
          console.log(err);
        });
      setLoading(false);
    }
    loadChamados();

    //Desmounted
    // return () => {};
  }, []);

  async function updadeState(snapshot) {
    const isCollectionEmpty = snapshot.length === 0;
    const lista = [];
    if (!isCollectionEmpty) {
      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          assunto: doc.assunto,
          cliente: doc.cliente,
          clienteId: doc.clienteId,
          created: doc.created,
          createdFormated: format(doc.created.toDate(), "dd/MM/yyyy"),
          status: doc.status,
          complemento: doc.complemento,
        });
      });
      setChamados((chamados) => [...chamados, ...lista]);
    } else {
      setIsEmpty(true);
    }
  }

  function togglePostModal(item) {
    setShowPostModal(!showPostModal);
    setDatail(item);
  }

  if (loading) {
    return (
      <div>
        <Header />
        <div className="content">
          <Title name="Atendimentos">
            <FiMessageSquare size={25} />
          </Title>
          <div className="container dashboard">
            <span>Buscando chamados...</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Atendimentos">
          <FiMessageSquare size={25} />
        </Title>
        {chamados.length === 0 ? (
          <div className="container dashboard">
            <span>Nenhum chamado registrado...</span>
            <Link to="/new" className="new">
              <FiPlus size={25} color="#FFF" />
              Novo chamado
            </Link>
          </div>
        ) : (
          <>
            <Link to="/new" className="new">
              <FiPlus size={25} color="#FFF" />
              Novo chamado
            </Link>

            <table>
              <thead>
                <tr>
                  <th scope="col">Cliente</th>
                  <th scope="col">Assunto</th>
                  <th scope="col">Status</th>
                  <th scope="col">Cadastrado em</th>
                  <th scope="col">#</th>
                </tr>
              </thead>
              <tbody>
                {chamados.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td data-label="Cliente">{item.cliente}</td>
                      <td data-label="Assunto">{item.assunto}</td>
                      <td data-label="Status">
                        <span
                          className="badge"
                          style={{
                            backgroundColor:
                              item.status === "Aberto" ? "#5cb85c" : "#999",
                          }}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td data-label="Cadastrado">{item.createdFormated}</td>
                      <td data-label="#">
                        <button
                          onClick={() => {
                            togglePostModal(item);
                          }}
                          className="action"
                          style={{ backgroundColor: "#3583f6" }}
                        >
                          <FiSearch size={17} color="#FFF" />
                        </button>
                        <Link
                          className="action"
                          style={{ backgroundColor: "#f6a935" }}
                          to={`/new/${item.id}`}
                        >
                          <FiEdit2 size={17} color="#FFF" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
      {showPostModal && <Modal conteudo={datail} close={togglePostModal} />}
    </div>
  );
}

export default Dashboard;
