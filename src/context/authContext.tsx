import React, { useContext, useState } from "react";
import { services } from "../api/services";
import { repositories } from "../database/repositories";
import { useErrorContext } from "./errorContext";

interface IAuthContext {
  session: ISession | null;
  logged: boolean;

  login: (credentials: ILoginRequest) => void;
}

export const AuthContext = React.createContext<IAuthContext>({} as IAuthContext);

export const AuthContextProvider = ({ children }) => {
  const { showError } = useErrorContext();

  const [session, setSession] = useState<IAuthContext["session"]>(null);
  const logged = !!session;

  const login: IAuthContext["login"] = async (credentials) => {
    try {
      let token = await repositories.login.getToken(credentials);

      if (!token) {
        token = (await services.auth.login(credentials)).token;
        await repositories.login.save({ ...credentials, token });
      }

      setSession({ ...credentials, token });
    } catch (error) {
      if (error instanceof Error) {
        error.message.includes("code 400")
          ? showError("Credenciais inválidas")
          : showError("Não foi possível realizar o login, tente novamente!");
      }
    }
  };

  return <AuthContext.Provider value={{ logged, login, session }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
