import { Route, Routes } from "react-router-dom";
import SideBar from "./components/sideBar";
import Profile from "./components/profile";
import AddProduct from "./components/addProduct";
import Customers from "./components/customers";

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <SideBar />
      <Routes>
        <Route path="profile" element={<Profile />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="customers" element={<Customers />} />
      </Routes>
    </div>
  );
};

export default AdminDashboard;
