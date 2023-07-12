import React, { createContext, useContext, useState } from "react";
import { Toast } from "../components/Toast";

type IErrorContext = {
  showError: (message: string) => void;
};

export const ErrorContext = createContext<IErrorContext>({} as IErrorContext);

export const ErrorContextProvider = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const showError = (message: string) => {
    setErrorMessage(message);
  };

  return (
    <ErrorContext.Provider value={{ showError }}>
      {children}
      {errorMessage && <Toast message={errorMessage} onClose={() => setErrorMessage(null)} />}
    </ErrorContext.Provider>
  );
};

export const useErrorContext = () => {
  return useContext(ErrorContext);
};
