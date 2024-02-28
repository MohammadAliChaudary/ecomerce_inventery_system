const errorMiddleWare = (err, req, res, next) => {
  const statusCode = err.status;
  const status = "error";
  const message = err.message;
  return res.status(statusCode).json({ status, message });
};

module.exports = {
  errorMiddleWare,
};
