import { Link } from "react-router-dom";
import ProductsRow from "./productsRow";

const ManageProducts = () => {
  return (
    <div className="main">
      <div className="details">
        <div className="recentOrders">
          <div className="cardHeader">
            <h2>Order List</h2>
            <Link to={"/admin/add-product"} className="btn">
              Add Product
            </Link>
          </div>
        </div>
      </div>
      <ProductsRow type={"manage-products"} />
    </div>
  );
};

export default ManageProducts;
