const mailUtils = require("../utils/emailUtils");
const transporter = require("../config/emailConfig");
const db = require("../config/dbConfig");

const dummyCard = {
  name: "John Doe",
  card_number: 4242424242424242,
  expiry: "02/2027",
  cvv: 134,
};

const PaymentController = (req, res, next) => {
  const { name, card_number, expiry, cvv } = req.body;
  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear() % 100;
  const [expiryMonth, expiryYear] = expiry
    .split("/")
    .map((date) => parseInt(date));

  if (name !== dummyCard.name) {
    const err = {
      status: 400,
      message: "Name on card does not match with your name",
    };
    return next(err);
  }

  if (parseInt(card_number) !== dummyCard.card_number) {
    const err = {
      status: 400,
      message: "Your card number is not correct",
    };
    return next(err);
  }

  if (parseInt(cvv) !== dummyCard.cvv) {
    const err = {
      status: 400,
      message: "Your cvv is not correct",
    };
    return next(err);
  }

  const isValid =
    expiryYear > year || (expiryYear === year && expiryMonth >= month);

  if (!isValid) {
    const err = {
      status: 400,
      message: "Your card  is expired",
    };
    return next(err);
  }

  const mailOptions = mailUtils.mailOptions(
    process.env.EMAIL_USER,
    req.user.email,
    "Dummy payment",
    "You payment is done. You will receive your products shortly"
  );

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return next(err);
    } else {
      return res.json({
        status: "success",
        message: "Email has been sent successfully",
        data: info,
      });
    }
  });

  const status = "Paid";
  const userId = req.user.user_id;

  console.log(userId);
  const query = "UPDATE cart SET status = ? WHERE user_id = ?";
  db.query(query, [status, userId], (err, result) => {
    if (err) {
      return next(err);
    } else {
      return res.json({
        status: "success",
        message: "Payment has been done",
        data: result,
      });
    }
  });
};

module.exports = { PaymentController };
