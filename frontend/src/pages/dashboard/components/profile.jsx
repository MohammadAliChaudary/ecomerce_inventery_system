import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { axiosPrivate } from "../../../api/axiosApi";
import ReadOnlyForm from "../../../components/readOnlyForm";
import EditProductsForm from "../../../components/editProductForm";
import useError from "../../../hooks/useError";
import useSuccess from "../../../hooks/useSuccess";
import ErrorHandler from "../../../components/errorHandler";
import SuccessMessageHandler from "../../../components/succeesMessageHandler";
import { SuspenseLoader } from "../../../App";
import Loader from "../../../components/Loader";
import useFetchUserProduct from "../../../services/productHandler/useFetchUserProducts";
import ProductsRow from "./productsRow";

const profile = () => {
  const [stats, setStats] = useState([]);
  const [products, setProducts] = useState([]);
  const { auth } = useAuth();
  const userId = auth.user[0].user_id;

  const { error } = useError();
  const [quantity, setQuntity] = useState(0);
  const { success } = useSuccess();
  const [loader, setLoader] = useState();
  const [earning, setEarning] = useState(0);
  const [sales, setSales] = useState(0);

  useEffect(() => {
    getStats();
  }, []);

  const getStats = async () => {
    setLoader(true);
    try {
      const res = await axiosPrivate.get("/cart");
      setStats(res.data.data);
      console.log(stats);
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    let sale = 0;
    let earning = 0;
    console.log(stats);
    stats.forEach((item, i) => {
      sale = parseInt(item.quantity) + sale;
      earning = parseInt(item.totalPrice) + earning;
      setEarning(earning);
      setSales(sale);
    });
  }, [sales, earning, stats]);

  useEffect(() => {
    let value = 0;
    products.forEach((item, i) => {
      value = parseInt(item.product_quantity || item.quantity) + value;
      setQuntity(value - sales);
    });
  }, [products, quantity, sales]);

  return (
    <>
      {loader ? <SuspenseLoader /> : null}
      {error !== "" ? <ErrorHandler /> : null}
      {success !== "" ? <SuccessMessageHandler /> : null}

      <div className="main">
        <div className="topbar">
          <div className="toggle">
            <ion-icon name="menu-outline"></ion-icon>
          </div>

          <div className="search">
            <label>
              <input type="text" placeholder="Search here" />
              <ion-icon name="search-outline"></ion-icon>
            </label>
          </div>

          <div className="user">
            <img src="assets/imgs/customer01.jpg" alt="" />
          </div>
        </div>

        <div className="cardBox">
          <div className="card">
            <div>
              <div className="numbers">{quantity}</div>
              <div className="cardName">Total available stock</div>
            </div>

            <div className="iconBx">
              <ion-icon name="analytics-outline"></ion-icon>
            </div>
          </div>

          <div className="card">
            <div>
              <div className="numbers">{sales}</div>
              <div className="cardName">Sales</div>
            </div>

            <div className="iconBx">
              <ion-icon name="cart-outline"></ion-icon>
            </div>
          </div>

          <div className="card">
            <div>
              <div className="numbers">${earning}</div>
              <div className="cardName">Earning</div>
            </div>

            <div className="iconBx">
              <ion-icon name="cash-outline"></ion-icon>
            </div>
          </div>
        </div>
        <ProductsRow />
      </div>
    </>
  );
};

export default profile;
