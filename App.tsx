import { StatusBar } from "expo-status-bar";
import { Routes } from "./src/routes";
import { AuthContextProvider } from "./src/context/authContext";

import { useEffect } from "react";
import { createTables } from "./src/database/setup";

export default function App() {
  useEffect(() => {
    createTables();
  }, []);

  return (
    <>
      <AuthContextProvider>
        <Routes />
        <StatusBar style="auto" />
      </AuthContextProvider>
    </>
  );
}
