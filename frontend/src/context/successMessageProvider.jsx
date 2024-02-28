import { createContext, useState } from "react";

const SuccessContext = createContext({});

export const SuccessProvider = ({ children }) => {
  const [success, setSuccess] = useState("");
  return (
    <SuccessContext.Provider value={{ success, setSuccess }}>
      {children}
    </SuccessContext.Provider>
  );
};

export default SuccessContext;
