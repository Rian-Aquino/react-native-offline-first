import React, { createContext, useContext, useEffect, useState } from "react";
import { useNetInfo } from "@react-native-community/netinfo";

interface IOfflineQueueContext {
  enqueueRequest: (requestFn: any) => void;
}

const OfflineQueueContext = createContext<IOfflineQueueContext>({} as IOfflineQueueContext);

export const OfflineQueueContextProvider = ({ children }) => {
  const { isConnected } = useNetInfo();
  const [queue, setQueue] = useState([]);

  const enqueueRequest = (requestFn) => {
    setQueue((prev) => [...prev, requestFn]);
  };

  const processQueue = async () => {
    for (const requestFn of queue) {
      try {
        await requestFn();
      } catch (error) {
        console.log(error);
      }
    }

    setQueue([]);
  };

  useEffect(() => {
    if (isConnected === true) {
      processQueue();
    }
  }, [isConnected]);

  return (
    <OfflineQueueContext.Provider value={{ enqueueRequest }}>
      {children}
    </OfflineQueueContext.Provider>
  );
};

export const useOfflineQueue = () => {
  return useContext(OfflineQueueContext);
};
