import { useState } from "react";
import "../../../assets/cardDetail.css";
import { axiosPrivate } from "../../../api/axiosApi";
import useError from "../../../hooks/useError";
import useSuccess from "../../../hooks/useSuccess";
import Loader from "../../../components/Loader";

const CardDetail = ({ totalPrice, setToatalPrice, getCartProduct }) => {
  const api = "payment";
  const [name, setName] = useState("");
  const [cardNumber, setCartNumber] = useState();
  const [date, setDate] = useState();
  const [cvv, setCvv] = useState();
  const [loading, setLoading] = useState();
  const { error, setError } = useError();
  const { success, setSuccess } = useSuccess();

  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await axiosPrivate.post(api, {
        name: name,
        card_number: cardNumber,
        expiry: date,
        cvv: cvv,
      });
      if (res.status === 200) {
        setSuccess(
          "Your payment is done. Check your email we have sent to you"
        );
        setToatalPrice(0);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        const err =
          error.response.data?.message[0].message ||
          error.response.data?.message;
        setError(err);
      }
    } finally {
      setLoading(false);
      //   setName("");
      //   setCartNumber("");
      //   setCvv("");
      //   setDate("");
      await getCartProduct();
    }
  };

  return (
    <div class="payment-info">
      <div class="d-flex justify-content-between align-items-center">
        <span>Card details</span>
        <img class="rounded" src="https://i.imgur.com/WU501C8.jpg" width="30" />
      </div>
      <span class="type d-block mt-3 mb-1">Card type</span>
      <label class="radio">
        {" "}
        <input type="radio" name="card" value="payment" checked />{" "}
        <span>
          <img
            width="30"
            src="https://img.icons8.com/color/48/000000/mastercard.png"
          />
        </span>{" "}
      </label>

      <label class="radio">
        {" "}
        <input type="radio" name="card" value="payment" />{" "}
        <span>
          <img
            width="30"
            src="https://img.icons8.com/officel/48/000000/visa.png"
          />
        </span>{" "}
      </label>

      <label class="radio">
        {" "}
        <input type="radio" name="card" value="payment" />{" "}
        <span>
          <img
            width="30"
            src="https://img.icons8.com/ultraviolet/48/000000/amex.png"
          />
        </span>{" "}
      </label>

      <label class="radio">
        {" "}
        <input type="radio" name="card" value="payment" />{" "}
        <span>
          <img
            width="30"
            src="https://img.icons8.com/officel/48/000000/paypal.png"
          />
        </span>{" "}
      </label>
      <div>
        <label class="credit-card-label">Name on card</label>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          class="form-control credit-inputs"
          placeholder="Name"
        />
      </div>
      <div>
        <label class="credit-card-label">Card number</label>
        <input
          type="text"
          value={cardNumber}
          class="form-control credit-inputs"
          onChange={(e) => {
            setCartNumber(e.target.value);
          }}
          placeholder="0000 0000 0000 0000"
        />
      </div>
      <div class="row">
        <div class="col-md-6">
          <label class="credit-card-label">expiry</label>
          <input
            type="text"
            value={date}
            class="form-control credit-inputs"
            onChange={(e) => {
              setDate(e.target.value);
            }}
            placeholder="12/24"
          />
        </div>
        <div class="col-md-6">
          <label class="credit-card-label">CVV</label>
          <input
            type="text"
            value={cvv}
            class="form-control credit-inputs"
            onChange={(e) => {
              setCvv(e.target.value);
            }}
            placeholder="342"
          />
        </div>
      </div>
      <hr class="line" />
      <div class="d-flex justify-content-between information">
        <span>Subtotal</span>
        <span>{`$${totalPrice}.00`}</span>
      </div>
      <button
        disabled={totalPrice === 0}
        onClick={() => {
          handlePayment();
        }}
        class="btn btn-primary btn-block d-flex justify-content-between mt-3"
        type="button"
      >
        <span>{`$${totalPrice}.00`}</span>
        <span>
          {loading ? (
            <Loader size={40} />
          ) : (
            <>
              Checkout<i class="fa fa-long-arrow-right ml-1"></i>
            </>
          )}
        </span>
      </button>
    </div>
  );
};

export default CardDetail;
