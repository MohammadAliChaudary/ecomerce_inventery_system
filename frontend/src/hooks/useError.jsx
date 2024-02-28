import { useContext } from "react";
import ErrorContext from "../context/errorProvider";
const useError = () => {
  return useContext(ErrorContext);
};

export default useError;
