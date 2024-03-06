import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../components/navBar";
import useAuth from "../../../hooks/useAuth";
import { axiosPrivate } from "../../../api/axiosApi";
import useError from "../../../hooks/useError";
import ErrorHandler from "../../../components/errorHandler";
import { SuspenseLoader } from "../../../App";
import CardDetail from "./cardDetail";
import useSuccess from "../../../hooks/useSuccess";
import SuccessMessageHandler from "../../../components/succeesMessageHandler";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();
  const { auth } = useAuth();
  const { error, setError } = useError();
  const { success, setSuccess } = useSuccess();
  const [totalPrice, setTotalPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const api = `cart/${auth.user[0].user_id}`;

  const getCartProduct = async () => {
    setLoading(true);
    try {
      const res = await axiosPrivate.get(api);
      console.log(res);
      if (res.status === 200) {
        setData(res.data.data);
      }
    } catch (error) {
      console.log(error);
      setError("Error in fetching cart items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCartProduct();
  }, []);

  const deleteCartItem = async (id) => {
    const api = `cart/${id}`;
    setLoading(true);
    try {
      const res = await axiosPrivate.delete(api);
      console.log(res);
    } catch (error) {
      setError("Error in deleting the product");
    } finally {
      await getCartProduct();
    }
  };

  const updatequantity = async (id, quantity, product_id, price) => {
    const api = "cart";
    setLoading(true);
    try {
      const res = await axiosPrivate.put(api, {
        id: id,
        quantity: quantity,
        product_id: product_id,
        price: price,
      });
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        const err =
          error.response.data?.message[0].message ||
          error.response.data?.message;
        setError(err);
      }
    } finally {
      await getCartProduct();
    }
  };

  useEffect(() => {
    let price = 0;
    data.forEach((a, i) => {
      price = price + JSON.parse(a.quantity) * JSON.parse(a.price);
      setTotalPrice(price);
    });
    console.log(price);
  }, [quantity, data]);

  return (
    <>
      {loading ? <SuspenseLoader /> : null}
      {error !== "" ? <ErrorHandler /> : null}
      {success !== "" ? <SuccessMessageHandler /> : null}
      <div style={{ height: "100vh" }}>
        <Navbar />
        <div>
          <div class="container mt-5 p-3 rounded cart">
            <div class="row no-gutters">
              <div class="col-md-8">
                <div class="product-details mr-2">
                  <div class="d-flex flex-row align-items-center">
                    <i class="fa fa-long-arrow-left"></i>
                    <span class="ml-2">
                      <Link to={"/"}>Continue Shopping</Link>
                    </span>
                  </div>
                  <hr />
                  <h6 class="mb-0">Shopping cart</h6>
                  <div class="d-flex justify-content-between">
                    <span>You have {data.length || 0} items in your cart</span>
                    <div class="d-flex flex-row align-items-center">
                      <span class="text-black-50">Sort by:</span>
                      <div class="price ml-2">
                        <span class="mr-1">price</span>
                        <i class="fa fa-angle-down"></i>
                      </div>
                    </div>
                  </div>
                  {data !== 0 ? (
                    data.map((d, i) => (
                      <div class="d-flex justify-content-between align-items-center mt-3 p-2 items rounded">
                        <div class="d-flex flex-row">
                          <div
                            style={{
                              width: "40px",
                              height: "40px",
                              backgroundColor: "grey",
                            }}
                            className="rounded"
                          ></div>
                          <div class="ml-2">
                            <span class="font-weight-bold d-block">
                              {d.product_name}
                            </span>
                            <span class="spec">{d.product_desc}</span>
                          </div>
                        </div>
                        <div class="d-flex flex-row align-items-center">
                          <span class="d-block">
                            <input
                              type="number"
                              value={d.quantity}
                              min={1}
                              onChange={(e) => {
                                setQuantity(e.target.value);
                                updatequantity(
                                  d.id,
                                  e.target.value,
                                  d.product_id,
                                  d.price
                                );
                              }}
                            />
                          </span>
                          <span class="d-block ml-5 font-weight-bold">{`$${
                            d.price * d.quantity
                          }`}</span>
                          <i
                            onClick={() => {
                              deleteCartItem(d.id);
                            }}
                            class="fa fa-trash-o ml-3 text-black-50"
                          ></i>
                        </div>
                      </div>
                    ))
                  ) : (
                    <h1>Add Products to cart</h1>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <CardDetail
                  totalPrice={totalPrice}
                  getCartProduct={getCartProduct}
                  setToatalPrice={setTotalPrice}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
