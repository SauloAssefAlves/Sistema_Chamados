import { useContext } from "react";
import { Route, Routes, useNavigate, Outlet, Navigate } from "react-router";
import { AuthContext } from "../contexts/auth";

export default function RouteWrapper({ isPrivate }) {
  const go = useNavigate();

  //import useContext para pegar o contexto do AuthContext.
  //Que foi criado com createContext()
  const { signed, loading } = useContext(AuthContext);

  if (loading) {
    return <div>LOADING</div>;
  }

  if (!signed && isPrivate) {
    return <Navigate to="/" />;
  }

  if (signed && !isPrivate) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
}
