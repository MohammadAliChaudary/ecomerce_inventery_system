import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { auth } = useAuth();
  const logout = useLogout();
  return (
    <div
      className="navbar"
      style={{
        padding: "30px",
        border: "solid 1px red",
        width: "100%",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {auth.user[0].user_role === "Admin" ? (
        <div style={{ fontSize: "30px", fontWeight: "bold" }}>
          <Link to={"/admin/profile"}>Dashboard</Link>
        </div>
      ) : null}
      <div
        style={{
          fontSize: "40px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link to={"/cart"}>
          <ion-icon name="cart-outline"></ion-icon>
        </Link>
      </div>

      <button
        onClick={() => {
          logout();
        }}
      >
        logout
      </button>
    </div>
  );
};

export default Navbar;
