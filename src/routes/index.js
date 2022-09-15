//Routes as Switch
import { Switch } from "react-router-dom";
import Route from "./Route";
import Dashboard from "../pages/Dashboard";
import SignIn from "../pages/SingnIn";
import SignUp from "../pages/SingUp";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/register" component={SignUp} />
      <Route isPrivate exact path="/dashboard" component={Dashboard} />
    </Switch>
  );
}
