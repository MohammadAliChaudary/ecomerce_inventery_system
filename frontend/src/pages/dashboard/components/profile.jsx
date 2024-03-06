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

const profile = () => {
  const [stats, setStats] = useState([]);
  const [products, setProducts] = useState([]);
  const { auth } = useAuth();
  const getYourProductApi = `product/${auth.user[0].user_id}`;
  const [read, setRead] = useState(null);
  const [edit, setEdit] = useState(null);
  const { error } = useError();
  const [quantity, setQuntity] = useState(0);
  const { success } = useSuccess();
  const [loader, setLoader] = useState();
  const [earning, setEarning] = useState(0);
  const [sales, setSales] = useState(0);

  const deleteProduct = async (product_id) => {
    setLoader(true);
    const api = `product/${product_id}`;
    try {
      const res = await axiosPrivate.delete(api);
    } catch (error) {
    } finally {
      await getYourProducts();
      setLoader(false);
    }
  };

  const getYourProducts = async () => {
    setLoader(true);
    try {
      const res = await axiosPrivate.get(getYourProductApi);
      if (res.status === 200) {
        setProducts(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

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
  }, [sales, earning, stats, deleteProduct]);

  useEffect(() => {
    let value = 0;
    products.forEach((item, i) => {
      value = parseInt(item.product_quantity || item.quantity) + value;
      setQuntity(value - sales);
    });
  }, [products, quantity, sales, deleteProduct]);

  useEffect(() => {
    getYourProducts();
    getStats();
  }, []);

  return (
    <>
      {loader ? <SuspenseLoader /> : null}
      {error !== "" ? <ErrorHandler /> : null}
      {success !== "" ? <SuccessMessageHandler /> : null}
      {read !== null ? (
        <ReadOnlyForm
          name={read.name}
          desc={read.desc}
          price={read.price}
          quantity={read.quantity}
          setRead={setRead}
        />
      ) : null}
      {edit !== null ? (
        <EditProductsForm
          name={edit.name}
          desc={edit.desc}
          price={edit.price}
          quantity={edit.quantity}
          product_id={edit.product_id}
          setEdit={setEdit}
          getYourProducts={getYourProducts}
        />
      ) : null}
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

        <div className="details">
          <div className="recentOrders">
            <div className="cardHeader">
              <h2>Order List</h2>
              <a href="#" className="btn">
                View All
              </a>
            </div>

            <table>
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Description</td>
                  <td>Price</td>
                  <td>Total Quantity</td>

                  <td>Actions</td>
                </tr>
              </thead>

              <tbody>
                {products.map((data, i) => (
                  <tr key={i}>
                    <td>{data.product_name}</td>
                    <td>{data.product_desc}</td>
                    <td>${data.price}</td>
                    <td>{data.product_quantity || data.quantity}</td>
                    <td>
                      <span
                        onClick={() => {
                          setRead({
                            name: data.product_name,
                            desc: data.product_desc,
                            price: data.price,
                            quantity: data.product_quantity || data.quantity,
                          });
                        }}
                      >
                        <ion-icon name="reader-outline"></ion-icon>
                      </span>
                      <span
                        onClick={() => {
                          setEdit({
                            name: data.product_name,
                            desc: data.product_desc,
                            price: data.price,
                            quantity: data.quantity || data.product_quantity,
                            product_id: data.product_id,
                          });
                        }}
                      >
                        <ion-icon name="create-outline"></ion-icon>
                      </span>
                      <span
                        onClick={() => {
                          deleteProduct(data.product_id);
                        }}
                      >
                        <ion-icon name="trash-outline"></ion-icon>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default profile;
