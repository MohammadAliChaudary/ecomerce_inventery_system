const mailOptions = (from, to, subject, text) => {
  return {
    from: from,
    to: to,
    subject: subject,
    text: text,
  };
};

module.exports = {
  mailOptions,
};
