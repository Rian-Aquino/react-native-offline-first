import React, { useContext, useState } from "react";
import { services } from "../api/services";
import { repositories } from "../database/repositories";
import { useNetInfo } from "@react-native-community/netinfo";
import { useOfflineQueue } from "./offlineQueueContext";
import { useErrorContext } from "./errorContext";

interface IUserContext {
  userList: IUserList | null;
  isLoading: boolean;

  loadUsers: () => Promise<void>;
  createUser: (user: IUserPostRequest) => Promise<void>;
  setUserList: React.Dispatch<React.SetStateAction<IUserList>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserContext = React.createContext<IUserContext>({} as IUserContext);

export const UserContextProvider = ({ children }) => {
  const { enqueueRequest } = useOfflineQueue();
  const { showError } = useErrorContext();

  const [userList, setUserList] = useState<IUserList | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isConnected } = useNetInfo();

  const nextPage = (userList?.page || 0) + 1;

  const syncUsers = async () => {
    if (isConnected) {
      try {
        const res = (await services.user.list(1, 24)).data;

        repositories.user.sync(res);
      } catch (error) {
        showError("Oops, ocorreu um erro durante a sincronização dos dados.");
      }
    }
  };

  const loadUsers = async () => {
    try {
      await syncUsers();

      const localUsers = await repositories.user.list(nextPage);
      const hasLocalUsers = Boolean(localUsers.data.length);

      if (!hasLocalUsers) {
        const apiUsers = await services.user.list(nextPage);

        const hasApiUsers = Boolean(apiUsers.data.length);

        if (!hasApiUsers) {
          setIsLoading(false);
        } else {
          setUserList((prev) => ({
            ...apiUsers,
            data: [...(prev?.data || []), ...apiUsers.data],
          }));
        }

        return;
      }

      setUserList((prev) => ({ ...localUsers, data: [...(prev?.data || []), ...localUsers.data] }));
      if (!hasLocalUsers) setIsLoading(false);
    } catch (error) {
      showError("Não foi possível carregar os usuários.");
    }
  };

  const createUser: IUserContext["createUser"] = async (user) => {
    try {
      if (isConnected) {
        const res = await services.user.save(user);

        await repositories.user.save(res);

        setUserList((prev) => ({ ...prev, data: [...(prev?.data || []), res] }));
      } else {
        const res = await repositories.user.save(user);

        enqueueRequest(async () => {
          await services.user.save(user);
          syncUsers();
        });

        setUserList((prev) => ({ ...prev, data: [...(prev?.data || []), res] }));
      }
    } catch (error) {
      showError("Não foi possível registrar o usuário");
    }
  };

  return (
    <UserContext.Provider
      value={{ userList, setUserList, isLoading, setIsLoading, loadUsers, createUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
