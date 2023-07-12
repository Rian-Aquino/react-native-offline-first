import { StatusBar } from "expo-status-bar";
import { Routes } from "./src/routes";
import { AuthContextProvider } from "./src/context/authContext";

import { useEffect } from "react";
import { createTables } from "./src/database/setup";
import { OfflineQueueContextProvider } from "./src/context/offlineQueueContext";
import { ErrorContextProvider } from "./src/context/errorContext";

export default function App() {
  useEffect(() => {
    createTables();
  }, []);

  return (
    <ErrorContextProvider>
      <OfflineQueueContextProvider>
        <AuthContextProvider>
          <Routes />
          <StatusBar style="auto" />
        </AuthContextProvider>
      </OfflineQueueContextProvider>
    </ErrorContextProvider>
  );
}
