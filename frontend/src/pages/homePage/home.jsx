import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import BuyerCard from "../../components/buyerCard";
import { useEffect, useState } from "react";
import { axiosPrivate } from "../../api/axiosApi";
import useError from "../../hooks/useError";
import ErrorHandler from "../../components/errorHandler";
import { SuspenseLoader } from "../../App";
import Navbar from "../../components/navBar";
const Home = () => {
  const { auth } = useAuth();
  const api = "product";
  const [loader, setLoader] = useState();
  const logout = useLogout();
  const { error, setError } = useError();
  const [data, setData] = useState([]);
  const getAllProducts = async () => {
    setLoader(true);
    try {
      const res = await axiosPrivate.get(api);
      console.log(res);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
      setError("Un expected error occur.Please try again later");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <>
      {loader ? <SuspenseLoader /> : null}
      {error !== "" ? <ErrorHandler /> : null}
      <div style={{ height: "100vh" }}>
        <Navbar />
        <div style={{ padding: "20px", marginTop: "20px" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              marginTop: "50px",
            }}
          >
            {data.map((d, i) => (
              <>
                <BuyerCard
                  name={d.product_name}
                  desc={d.product_desc}
                  price={d.price}
                  productId={d.product_id}
                  quantity={d.quantity}
                />
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
