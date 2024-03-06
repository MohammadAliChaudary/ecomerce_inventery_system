import { useLocation, Navigate, Outlet, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const RequireAuth = () => {
  const location = useLocation();
  const { auth } = useAuth();
  // console.log(auth.accessToken);
  return (
    <>
      {auth?.accessToken ? (
        <Outlet />
      ) : (
        <Navigate to={"/auth"} state={{ location }} replace />
      )}
    </>
  );
};

export default RequireAuth;
