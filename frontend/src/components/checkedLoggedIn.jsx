import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
const CheckLoggedIn = () => {
  const [cookies] = useCookies();
  const location = useLocation();
  const userId = cookies.user_id;
  //   console.log("I am checking Login status", userId);
  return (
    <>
      {userId !== undefined ? (
        <Navigate to={"/"} state={{ from: location }} replace />
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default CheckLoggedIn;
