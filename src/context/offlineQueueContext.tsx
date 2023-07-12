import React, { createContext, useContext, useEffect, useState } from "react";
import { useNetInfo } from "@react-native-community/netinfo";
import { SafeAreaView, Text } from "react-native";
import { NoInternetWarning } from "../components/NoInternetWarning";
import { useErrorContext } from "./errorContext";

interface IOfflineQueueContext {
  enqueueRequest: (requestFn: any) => void;
}

const OfflineQueueContext = createContext<IOfflineQueueContext>({} as IOfflineQueueContext);

export const OfflineQueueContextProvider = ({ children }) => {
  const { isConnected } = useNetInfo();
  const { showError } = useErrorContext();

  const [queue, setQueue] = useState([]);

  const enqueueRequest = (requestFn) => {
    setQueue((prev) => [...prev, requestFn]);
  };

  const processQueue = async () => {
    for (const requestFn of queue) {
      await requestFn();
    }

    setQueue([]);
  };

  useEffect(() => {
    if (isConnected === true) {
      try {
        processQueue();
      } catch (error) {
        showError("Algo deu errado ao enviar suas alterações para o servidor...");
      }
    }
  }, [isConnected]);

  return (
    <OfflineQueueContext.Provider value={{ enqueueRequest }}>
      {!isConnected && <NoInternetWarning />}
      {children}
    </OfflineQueueContext.Provider>
  );
};

export const useOfflineQueue = () => {
  return useContext(OfflineQueueContext);
};
