import React, { useContext, useState } from "react";
import { services } from "../api/services";
import { repositories } from "../database/repositories";

interface IAuthContext {
  session: ISession | null;
  logged: boolean;

  login: (credentials: ILoginRequest) => void;
}

export const AuthContext = React.createContext<IAuthContext>({} as IAuthContext);

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState<IAuthContext["session"]>(null);
  const logged = !!session;

  const login: IAuthContext["login"] = async (credentials) => {
    let token = await repositories.login.getToken(credentials);

    if (!token) {
      token = (await services.auth.login(credentials)).token;
      await repositories.login.save({ ...credentials, token });
    }

    setSession({ ...credentials, token });
  };

  return <AuthContext.Provider value={{ logged, login, session }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
