import { StatusBar } from "expo-status-bar";
import { Routes } from "./src/routes";
import { AuthContextProvider } from "./src/context/authContext";

import { useEffect } from "react";
import { createTables } from "./src/database/setup";
import { UserContextProvider } from "./src/context/userContext";
import { OfflineQueueContextProvider } from "./src/context/offlineQueueContext";

export default function App() {
  useEffect(() => {
    createTables();
  }, []);

  return (
    <OfflineQueueContextProvider>
      <AuthContextProvider>
        <Routes />
        <StatusBar style="auto" />
      </AuthContextProvider>
    </OfflineQueueContextProvider>
  );
}
