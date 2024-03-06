import { useState } from "react";
import "../assets/buyerCard.css";
import { axiosPrivate } from "../api/axiosApi";
import useAuth from "../hooks/useAuth";
import useError from "../hooks/useError";
import Loader from "./Loader";
const BuyerCard = ({ name, desc, price, quantity, productId }) => {
  const [loader, setLoader] = useState();
  const { auth } = useAuth();
  const { setError } = useError();
  const api = "cart";
  const addToCart = async () => {
    setLoader(true);
    try {
      const res = await axiosPrivate.post(api, {
        product_name: name,
        product_desc: desc,
        product_id: productId,
        user_id: auth.user[0].user_id,
        price: price,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        const err =
          error.response.data?.message[0].message ||
          error.response.data?.message;
        setError(err);
      }
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="cards">
      <div className="card-image">
        <h1>{name}</h1>
      </div>
      <div className="card-name">
        <p>Name: {name}</p>
      </div>
      <div className="card-description">
        <p className="description">Description: {desc}</p>
        <p className="price">${price}</p>
      </div>
      <div class="btn-block">
        <button
          onClick={() => {
            addToCart();
          }}
        >
          {loader ? <Loader size={40} /> : "Add To Cart"}
        </button>
      </div>
    </div>
  );
};

export default BuyerCard;
