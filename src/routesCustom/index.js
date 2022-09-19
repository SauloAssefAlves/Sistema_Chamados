//Routes as Switch
import { Routes, Route } from "react-router-dom";
import RouteWrapper from "./RouteAuth";
import Dashboard from "../pages/Dashboard";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

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
    </Routes>
  );
}
