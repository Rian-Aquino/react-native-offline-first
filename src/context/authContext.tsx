import React, { useContext, useState } from "react";
import { services } from "../api/services";

interface IAuthContext {
  userCredentials: ILogin | null;
  token: string | null;
  logged: boolean;
  login: (credentials: ILogin) => void;
}

export const AuthContext = React.createContext<IAuthContext>({} as IAuthContext);

export const AuthContextProvider = ({ children }) => {
  const [userCredentials, setUserCredentials] = useState<IAuthContext["userCredentials"]>(null);
  const [token, setToken] = useState<IAuthContext["token"]>(null);
  const logged = !!userCredentials;

  const login: IAuthContext["login"] = async (credentials) => {
    const res = await services.auth.login(credentials);

    setUserCredentials({ ...credentials });
    setToken(res.token);
  };

  return (
    <AuthContext.Provider value={{ logged, login, userCredentials, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
