const ReadOnlyForm = ({ name, desc, price, quantity, setRead }) => {
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
      <div class="testbox">
        <form>
          <div class="banner">
            <h1>Read the form</h1>
          </div>
          <div class="item">
            <p>Product Name</p>
            <div class="name-item" style={{ width: "100%" }}>
              <input
                value={name}
                readOnly={true}
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
              value={desc}
              readOnly={true}
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
              readOnly={true}
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
              readOnly={true}
              type="number"
              min={1}
              name="name"
              style={{ width: "100%" }}
            />
          </div>
          <div class="btn-block">
            <button
              onClick={() => {
                setRead(null);
              }}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReadOnlyForm;
