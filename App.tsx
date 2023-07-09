import { StatusBar } from "expo-status-bar";
import { Routes } from "./src/routes";
import { AuthContextProvider } from "./src/context/authContext";

export default function App() {
  return (
    <>
      <AuthContextProvider>
        <Routes />
        <StatusBar style="auto" />
      </AuthContextProvider>
    </>
  );
}
