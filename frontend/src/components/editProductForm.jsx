import { useEffect, useState } from "react";
import { axiosPrivate } from "../api/axiosApi";
import useSuccess from "../hooks/useSuccess";
import useError from "../hooks/useError";
import Loader from "./Loader";

const EditProductsForm = ({
  name,
  desc,
  price,
  quantity,
  setEdit,
  product_id,
  getYourProducts,
}) => {
  const [loading, setLoading] = useState();
  const [formData, setFromData] = useState({});
  const api = `product/${product_id}`;
  const { success, setSuccess } = useSuccess();
  const { error, setError } = useError();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFromData({
      ...formData,
      [name]: value,
    });
  };

  //   useEffect(() => {
  //     console.log(formData);
  //     console.log(Object.keys(formData).length === 0);
  //   }, [formData]);

  const handleOnSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await axiosPrivate.put(api, formData);
      console.log(res);
      if (res.status === 200) {
        setSuccess("Product Updated successfully");
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 500) {
        setError("Please change the data to update it");
      } else {
        setError("Try again later");
      }
    } finally {
      setLoading(false);
      setFromData({});
      setEdit(null);
      await getYourProducts();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 99,
        backgroundColor: "rgba(0,0,0,0.4)",
      }}
    >
      <div className="testbox">
        <form onSubmit={handleOnSubmit}>
          <div className="banner">
            <h1>Edit the form</h1>
          </div>
          <div className="item">
            <p>Product Name</p>
            <div className="name-item" style={{ width: "100%" }}>
              <input
                defaultValue={name}
                type="text"
                name="product_name"
                value={formData.product_name}
                onChange={handleOnChange}
                placeholder="Product Name"
                style={{ width: "100%" }}
              />
            </div>
          </div>
          <div className="item" style={{ width: "100%" }}>
            <p>Product Description</p>
            <textarea
              defaultValue={desc}
              cols={60}
              type="text"
              name="product_desc"
              value={formData.product_desc}
              onChange={handleOnChange}
              placeholder="Product Description"
              style={{ width: "100%" }}
            />
          </div>
          <div className="item" style={{ width: "100%" }}>
            <p>Quantity of products</p>
            <input
              defaultValue={quantity}
              type="number"
              min={1}
              name="quantity"
              value={formData.quantity}
              onChange={handleOnChange}
              style={{ width: "100%" }}
            />
          </div>
          <div className="item" style={{ width: "100%" }}>
            <p>Price</p>
            <input
              defaultValue={price}
              type="number"
              min={1}
              value={formData.price}
              onChange={handleOnChange}
              name="price"
              style={{ width: "100%" }}
            />
          </div>
          <div className="btn-block">
            <button
              onClick={() => {
                setEdit(null);
              }}
            >
              Close
            </button>
          </div>
          <div style={{ marginTop: "20px" }} className="btn-block">
            <button type="submit">
              {loading ? <Loader size={40} /> : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductsForm;
