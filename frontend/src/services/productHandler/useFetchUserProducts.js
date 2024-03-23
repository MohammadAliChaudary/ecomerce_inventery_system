import { axiosPrivate } from "../../api/axiosApi";
const useFetchUserProduct = () => {
  const fetchUserProduct = async (userId) => {
    const api = `product/${userId}`;
    try {
      const res = await axiosPrivate.get(api);
      if (res.status === 200) {
        return res.data.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return fetchUserProduct;
};

export default useFetchUserProduct;
