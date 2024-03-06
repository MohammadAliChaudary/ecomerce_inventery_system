import { useEffect } from "react";
import { axiosPrivate } from "../api/axiosApi";
import useAuth from "./useAuth";
import useLogout from "./useLogout";
const useRefreshToken = () => {
  const api = "refresh";
  const { auth, setAuth } = useAuth();
  const logout = useLogout();
  // useEffect(() => {
  //   console.log(auth);
  // }, [auth]);
  // console.log(auth);
  const refresh = async () => {
    try {
      const res = await axiosPrivate.get(api);
      setAuth((pre) => {
        return { ...pre, ...res.data.data };
      });
      // console.log(auth);
      return res.data?.accessToken;
    } catch (error) {
      logout();
    }
  };
  return refresh;
};

export default useRefreshToken;
