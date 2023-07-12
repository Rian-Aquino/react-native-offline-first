import React, { useContext, useState } from "react";
import { services } from "../api/services";
import { repositories } from "../database/repositories";
import { useNetInfo } from "@react-native-community/netinfo";
import { View, Text } from "react-native";
import { useOfflineQueue } from "./offlineQueueContext";

interface IUserContext {
  userList: IUserList | null;
  isLoading: boolean;

  loadUsers: () => Promise<void>;
  createUser: (user: IUserPostRequest) => Promise<void>;
}

export const UserContext = React.createContext<IUserContext>({} as IUserContext);

export const UserContextProvider = ({ children }) => {
  const { enqueueRequest } = useOfflineQueue();

  const [userList, setUserList] = useState<IUserList | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isConnected } = useNetInfo();

  const nextPage = (userList?.page || 0) + 1;

  const syncUsers = async () => {
    if (isConnected) {
      console.log("SYNC USERS");
      const res = (await services.user.list(1, 24)).data;

      repositories.user.completeUsersSync(res);
    }
  };

  const loadUsers = async () => {
    await syncUsers();

    const localUsers = await repositories.user.getUsers(nextPage);
    const hasLocalUsers = Boolean(localUsers.data.length);

    if (!hasLocalUsers) {
      console.log("REQUISIÇÃO API");
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
  };

  const createUser: IUserContext["createUser"] = async (user) => {
    console.log("CREATE USER");
    if (isConnected) {
      console.log("API CREATE");
      const res = await services.user.save(user);

      await repositories.user.save(res);

      setUserList((prev) => ({ ...prev, data: [...(prev?.data || []), res] }));
    } else {
      console.log("LOCAL");
      const res = await repositories.user.save(user);

      enqueueRequest(async () => {
        await services.user.save(user);
        syncUsers();
      });

      setUserList((prev) => ({ ...prev, data: [...(prev?.data || []), res] }));
    }
  };

  return (
    <UserContext.Provider value={{ userList, isLoading, loadUsers, createUser }}>
      {!isConnected && (
        <View>
          <Text>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusantium sunt ex tempore?
            Obcaecati officiis quis, ducimus eaque earum qui veniam sapiente animi corrupti,
            reiciendis voluptates sed consectetur libero illo repudiandae.
          </Text>
        </View>
      )}
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
