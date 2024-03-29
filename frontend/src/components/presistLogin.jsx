import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefresh";
import useAuth from "../hooks/useAuth";
import { SuspenseLoader } from "../App";
const PresistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    !auth ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return <>{isLoading ? <SuspenseLoader /> : <Outlet />}</>;
};

export default PresistLogin;
