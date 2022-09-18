// import firebase from "./services/firebaseConnection";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routesCustom";
import AuthProvider from "./contexts/auth";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer autoClose={3000} />
        <Routes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
