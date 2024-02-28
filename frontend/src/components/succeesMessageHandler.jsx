import closeButton from "../assets/signs-close-icon-png.webp";
import useSuccess from "../hooks/useSuccess";
const SuccessMessageHandler = () => {
  const { success, setSuccess } = useSuccess();
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: "1",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "end",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          background: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
          margin: "10px",
          borderRadius: "5px",
          boxShadow: "0px 14px 80px rgba(0, 255, 0, 0.2)",
          border: "solid 1px green",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "5px",
            cursor: "pointer",
          }}
          onClick={() => {
            setSuccess("");
          }}
        >
          <img
            style={{ width: "20px", height: "20px" }}
            src={closeButton}
            alt=""
          />
        </div>
        <p style={{ fontSize: "20px", marginBottom: "0px" }}>{success}</p>
      </div>
    </div>
  );
};

export default SuccessMessageHandler;
