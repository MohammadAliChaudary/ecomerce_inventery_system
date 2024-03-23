import { axiosPrivate } from "../../api/axiosApi";

const useDeleteProduct = () => {
  const deleteProduct = async (productId) => {
    const api = `product/${productId}`;
    try {
      const res = await axiosPrivate.delete(api);
    } catch (error) {
      console.log(error);
    }
  };
  return deleteProduct;
};

export default useDeleteProduct;
