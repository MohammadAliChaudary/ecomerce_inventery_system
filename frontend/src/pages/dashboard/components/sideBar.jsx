import useLogout from "../../../hooks/useLogout";
import { Link } from "react-router-dom";
const SideBar = () => {
  const logout = useLogout();
  const tabs = [
    {
      name: "Dashboard",
      icon: <ion-icon name="home-outline"></ion-icon>,
      logout: false,
      path: "profile",
    },
    {
      name: "Manage Poducts",
      icon: <ion-icon name="add-outline"></ion-icon>,
      logout: false,
      path: "manage-product",
    },
    {
      name: "Customers",
      icon: <ion-icon name="people-outline"></ion-icon>,
      logout: false,
      path: "customers",
    },
    {
      name: "Sign Out",
      icon: <ion-icon name="log-out-outline"></ion-icon>,
      logout: true,
    },
  ];
  return (
    <div className="navigation">
      <ul>
        <li>
          <Link to="/">
            <span className="icon">
              <ion-icon name="logo-apple"></ion-icon>
            </span>
            <span className="title">Brand Name</span>
          </Link>
        </li>

        {tabs.map((tab, i) => (
          <li key={i}>
            <Link to={tab.path ? tab.path : null}>
              <span className="icon">{tab.icon}</span>
              <span
                className="title"
                onClick={() => {
                  {
                    tab.logout ? logout() : null;
                  }
                }}
              >
                {tab.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
