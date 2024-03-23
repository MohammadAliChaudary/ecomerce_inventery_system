import useDeleteProduct from "../services/productHandler/useDeleteProduct";

const DeleteValidator = ({ id, setIsDeleting }) => {
  const deleteProduct = useDeleteProduct();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99,
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <div
        style={{
          padding: "25px",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          boxShadow: "0 7px 25px rgba(0, 0, 0, 0.08)",
          borderRadius: "15px",
        }}
        className="validator-wrapper"
      >
        <p style={{ fontSize: "20px", color: "black" }}>
          Are You sure you want to delete this product?
        </p>
        <div
          style={{ display: "flex", justifyContent: "flex-start", gap: "20px" }}
          className="buttons"
        >
          <button
            onClick={() => {
              deleteProduct(id);
              setIsDeleting(false);
            }}
            style={{
              padding: "1px 43px",
              color: "white",
              height: "57px",
              fontSize: "20px",
              backgroundColor: "red",
              border: "none",
              borderRadius: "5px",
            }}
          >
            DELETE
          </button>
          <button
            onClick={() => {
              setIsDeleting(false);
            }}
            style={{
              padding: "1px 43px",
              color: "black",
              height: "57px",
              fontSize: "20px",
              backgroundColor: "white",
              border: "none",
              borderRadius: "5px",
              boxShadow: "0 7px 25px rgba(0, 0, 0, 0.5)",
            }}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteValidator;
