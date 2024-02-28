import { createContext, useState } from "react";

const ErrorContext = createContext({});

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState("");
  return (
    <ErrorContext.Provider value={{ error, setError }}>
      {children}
    </ErrorContext.Provider>
  );
};

export default ErrorContext;
