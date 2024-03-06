import { axiosPrivate } from "../api/axiosApi";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const useLogout = () => {
  const api = "logout";
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies();

  const logout = async () => {
    try {
      const res = await axiosPrivate.get(api);
      if (res.status === 204) {
        navigate("/auth");
        removeCookie("user_id");
        setAuth({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  return logout;
};

export default useLogout;
