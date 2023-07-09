import { useAuth } from "../context/authContext";
import { Login } from "../features/Login";
import { AppRoutes } from "./app.routes";

export const Routes = () => {
  const { logged } = useAuth();
  return logged ? <AppRoutes /> : <Login />;
};
