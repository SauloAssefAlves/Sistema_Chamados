import { Route, Redirect } from "react-router";

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const loading = false;
  const singed = false;

  if (loading) {
    return <div></div>;
  }

  if (!singed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (singed && !isPrivate) {
    return <Redirect to="/dashboard" />;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
}
