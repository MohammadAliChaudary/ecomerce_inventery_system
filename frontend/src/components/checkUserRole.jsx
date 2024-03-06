import { Outlet, Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const CheckUserRole = () => {
  const { auth } = useAuth();
  const location = useLocation();
  return (
    <>
      {auth.user[0].user_role !== "Admin" ? (
        <Navigate to={"/"} state={{ from: location }} replace />
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default CheckUserRole;
