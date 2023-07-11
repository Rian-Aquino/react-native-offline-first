import React, { useContext, useState } from "react";
import { services } from "../api/services";
import { repositories } from "../database/repositories";

interface IAuthContext {
  userCredentials: ILoginRequest | null;
  token: string | null;
  logged: boolean;
  login: (credentials: ILoginRequest) => void;
}

export const AuthContext = React.createContext<IAuthContext>({} as IAuthContext);

export const AuthContextProvider = ({ children }) => {
  const [userCredentials, setUserCredentials] = useState<IAuthContext["userCredentials"]>(null);
  const [token, setToken] = useState<IAuthContext["token"]>(null);
  const logged = !!userCredentials;

  const login: IAuthContext["login"] = async (credentials) => {
    let res: ILoginResponse = {} as ILoginResponse;
    res.token = await repositories.login.getToken(credentials);

    if (!res.token) {
      res = await services.auth.login(credentials);
      await repositories.login.save({ ...credentials, token: res.token });
    }

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
