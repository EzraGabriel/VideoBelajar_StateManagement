import { Navigate, Outlet } from "react-router-dom";
import { getSession } from "../utils/auth";

export default function RequireAuth() {
  return getSession()?.token ? <Outlet /> : <Navigate to="/" replace />;
}
