require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const publicRoutes = require("./routes/publicRoutes");
const privateRoutes = require("./routes/privateRoutes");
const errorMiddleWare = require("./middleware/errorMiddleware");
const PORT = 5500;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(publicRoutes);
app.use(privateRoutes);

app.use(errorMiddleWare.errorMiddleWare);

app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});
