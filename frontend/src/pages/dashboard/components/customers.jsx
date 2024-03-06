import { useEffect, useState } from "react";
import { axiosPrivate } from "../../../api/axiosApi";
import useError from "../../../hooks/useError";
import { SuspenseLoader } from "../../../App";
import ErrorHandler from "../../../components/errorHandler";
import "../../../index.css";

const Customers = () => {
  const [loader, setLoader] = useState();
  const { error, setError } = useError();
  const [data, setData] = useState([]);
  const api = "customers";

  const getData = async () => {
    setLoader(true);
    try {
      const res = await axiosPrivate.get(api);
      if (res.status === 200) {
        setData(res.data.data);
      }
      console.log(res);
    } catch (error) {
      setError("Error in fetching records");
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {loader ? <SuspenseLoader /> : null}
      {error !== "" ? <ErrorHandler /> : null}
      <div className="main">
        {" "}
        <div className="details">
          <div className="recentOrders">
            <div className="cardHeader">
              <h2>Customers Info</h2>
              <a href="#" className="btn">
                View All
              </a>
            </div>

            <table>
              <thead>
                <tr>
                  <td>Customer Name</td>
                  <td>Contact Info</td>
                  <td>Product Name</td>
                  <td>Product Quantity</td>
                  <td>Status</td>
                </tr>
              </thead>

              <tbody>
                {data.map((item, i) => (
                  <tr key={i}>
                    <td>{item.user_name}</td>
                    <td>{item.email}</td>
                    <td>{item.product_name}</td>
                    <td>{item.product_quantity}</td>
                    <td
                      className={
                        item.status === "Due" ? "pending" : "delivered"
                      }
                    >
                      {item.status}
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

export default Customers;
