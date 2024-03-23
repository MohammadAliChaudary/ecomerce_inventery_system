import { useEffect, useState } from "react";
import DeleteValidator from "../../../components/deleteValidatior";
import useFetchUserProduct from "../../../services/productHandler/useFetchUserProducts";
import useAuth from "../../../hooks/useAuth";
import ReadOnlyForm from "../../../components/readOnlyForm";
import EditProductsForm from "../../../components/editProductForm";

const ProductsRow = ({ type }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState();
  const [read, setRead] = useState(null);
  const [edit, setEdit] = useState(null);
  const { auth } = useAuth();
  const fetchUserProduct = useFetchUserProduct();

  useEffect(() => {
    async function dataFetched() {
      const data = await fetchUserProduct(auth.user[0].user_id);
      setProducts(data);
    }
    dataFetched();
  }, []);

  return (
    <>
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
        />
      ) : null}
      {isDeleting ? (
        <DeleteValidator id={productId} setIsDeleting={setIsDeleting} />
      ) : null}
      <div className="details">
        <div className="recentOrders">
          {type !== "manage-products" ? (
            <div className="cardHeader">
              <h2>Order List</h2>
              <a href="#" className="btn">
                View All
              </a>
            </div>
          ) : null}
          <table>
            <thead>
              <tr>
                <td>Name</td>
                <td>Description</td>
                <td>Price</td>
                <td>Total Quantity</td>
                <td>No of sold products</td>
                <td>remaining products</td>
                <td>Actions</td>
              </tr>
            </thead>

            <tbody>
              {products.map((data, i) => (
                <tr key={i}>
                  <td>
                    {data.product_name}
                    {data.available_quantity === 0 ? (
                      <span style={{ color: "red" }}>
                        (This product is out of stock)
                      </span>
                    ) : null}
                  </td>
                  <td>{data.product_desc}</td>
                  <td>${data.price}</td>
                  <td>{data.product_quantity || data.quantity}</td>
                  <td>{data.cart_quantity}</td>
                  <td>{data.available_quantity}</td>
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
                        setIsDeleting(true);
                        setProductId(data.product_id);
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
    </>
  );
};

export default ProductsRow;
