//Routes as Switch
import { Routes, Route } from "react-router-dom";
import RouteWrapper from "./RouteAuth";
import Dashboard from "../pages/Dashboard";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Profile from "../pages/Profile";
import Customers from "../pages/Customers";
import New from "../pages/New";

export default function RoutesCustom() {
  return (
    <Routes>
      <Route exact path="/" element={<RouteWrapper />}>
        <Route exact path="/" element={<SignIn />} />
      </Route>
      <Route exact path="/register" element={<RouteWrapper />}>
        <Route exact path="/register" element={<SignUp />} />
      </Route>
      <Route exact path="/dashboard" element={<RouteWrapper isPrivate />}>
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route exact path="/profile" element={<RouteWrapper isPrivate />}>
        <Route exact path="/profile" element={<Profile />} />
      </Route>
      <Route exact path="/customers" element={<RouteWrapper isPrivate />}>
        <Route exact path="/customers" element={<Customers />} />
      </Route>
      <Route exact path="/new" element={<RouteWrapper isPrivate />}>
        <Route exact path="/new" element={<New />} />
      </Route>
    </Routes>
  );
}
