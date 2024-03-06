import { useState } from "react";
import { axiosPrivate } from "../../../api/axiosApi";
import "../../../assets/form.css";
import useAuth from "../../../hooks/useAuth";
import useError from "../../../hooks/useError";
import useSuccess from "../../../hooks/useSuccess";
import ErrorHandler from "../../../components/errorHandler";
import SuccessMessageHandler from "../../../components/succeesMessageHandler";
import Loader from "../../../components/Loader";
const AddProduct = () => {
  const api = "product";
  const [productName, setProductName] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();
  const { error, setError } = useError();
  const { success, setSuccess } = useSuccess();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosPrivate.post(api, {
        product_name: productName,
        product_desc: productDesc,
        quantity: quantity,
        price: price,
        user_id: auth.user[0].user_id,
      });
      if (res.status === 200) {
        setSuccess("Product added successfully");
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
      setPrice(0);
      setProductDesc("");
      setProductName("");
      setQuantity(0);
    }
  };
  return (
    <>
      {error !== "" ? <ErrorHandler /> : null}
      {success !== "" ? <SuccessMessageHandler /> : null}
      <div className="main">
        <div class="testbox">
          <form
            onSubmit={(e) => {
              handleOnSubmit(e);
            }}
          >
            <div class="banner">
              <h1>Add product form</h1>
            </div>
            <div class="item">
              <p>Product Name</p>
              <div class="name-item" style={{ width: "100%" }}>
                <input
                  value={productName}
                  onChange={(e) => {
                    setProductName(e.target.value);
                  }}
                  type="text"
                  name="name"
                  placeholder="Product Name"
                  style={{ width: "100%" }}
                />
              </div>
            </div>
            <div class="item" style={{ width: "100%" }}>
              <p>Product Description</p>
              <textarea
                value={productDesc}
                onChange={(e) => {
                  setProductDesc(e.target.value);
                }}
                cols={60}
                type="text"
                name="name"
                placeholder="Product Description"
                style={{ width: "100%" }}
              />
            </div>
            <div class="item" style={{ width: "100%" }}>
              <p>Quantity of products</p>
              <input
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
                type="number"
                min={1}
                name="name"
                style={{ width: "100%" }}
              />
            </div>
            <div class="item" style={{ width: "100%" }}>
              <p>Price</p>
              <input
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                type="number"
                min={1}
                name="name"
                style={{ width: "100%" }}
              />
            </div>
            <div class="btn-block">
              <button type="submit">
                {loading ? <Loader size={40} /> : "Add product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
