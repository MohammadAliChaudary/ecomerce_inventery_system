import { useContext } from "react";
import SuccessContext from "../context/successMessageProvider";

const useSuccess = () => {
  return useContext(SuccessContext);
};

export default useSuccess;
