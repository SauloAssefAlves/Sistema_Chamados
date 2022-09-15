import { useContext } from "react";
import { Route, Redirect } from "react-router";
import { AuthContext } from "../contexts/auth";

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  //import useContext para pegar o contexto do AuthContext.
  //Que foi criado com createContext()
  const { signed, loading } = useContext(AuthContext);

  if (loading) {
    return <div>LOADING</div>;
  }

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
}
