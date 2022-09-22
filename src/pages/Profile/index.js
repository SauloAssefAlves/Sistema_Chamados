import "./profile.css";
import Header from "../../components/Header";
import Title from "../../components/Title";
import avatar from "../../assets/avatar.png";
import { AuthContext } from "../../contexts/auth";
import { FiSettings, FiUpload } from "react-icons/fi";
import { useState, useContext } from "react";
import { updateDocs, storage } from "../../services/firebaseConnection";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function Profile() {
  const { user, signOut, setUser, storageUser } = useContext(AuthContext);

  const [nome, setNome] = useState(user && user.nome);
  const [email, setEmail] = useState(user && user.email);
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  const [imageAvatar, setImageAvatar] = useState(null);

  function handleFile(e) {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      if (image.type === "image/jpeg" || image.type === "image/png") {
        setImageAvatar(image);
        setAvatarUrl(URL.createObjectURL(e.target.files[0]));
      } else {
        alert("Envie uma imagem do tipo PNG ou JPEG");
        setImageAvatar(null);
        return null;
      }
    }
  }

  async function handleUpload() {
    const currentUid = user.uid;
    console.log(imageAvatar);
    const docRef = ref(storage, `images/${currentUid}/${imageAvatar.name}`);
    const uploadTask = await uploadBytes(docRef, imageAvatar).then(
      async (res) => {
        await getDownloadURL(docRef).then(async (url) => {
          let urlFoto = url;
          await updateDocs("users", user.uid, {
            avatarUrl: urlFoto,
            nome: nome,
          }).then((res) => {
            let data = { ...user, avatarUrl: urlFoto, nome: nome };

            setUser(data);
            storageUser(data);
          });
        });
      }
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (imageAvatar === null && nome !== "") {
      updateDocs("users", user.uid, { nome: nome })
        .then((res) => {
          let data = {
            ...user,
            nome: nome,
          };
          setUser(data);
          storageUser(data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (nome !== "" && imageAvatar !== null) {
      handleUpload();
    }
  }

  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Meu perfil">
          <FiSettings size={25} />
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={handleSubmit}>
            <label className="label-avatar">
              <span>
                <FiUpload color="#FFF" size={25} />
              </span>
              <input type="file" accept="image/*" onChange={handleFile} />
              <br />
              {avatarUrl == null ? (
                <img
                  src={avatar}
                  width="250"
                  height="250"
                  alt="Foto de perfil do Usuário"
                />
              ) : (
                <img
                  src={avatarUrl}
                  width="250"
                  height="250"
                  alt="Foto de perfil do Usuário"
                />
              )}
            </label>

            <label>Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <label>Email</label>
            <input type="text" value={email} disabled={true} />

            <button type="submit">Salvar</button>
          </form>
        </div>
        <div className="container">
          <button
            className="logout-btn"
            onClick={() => {
              signOut();
            }}
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
