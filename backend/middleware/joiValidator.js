const joiValidator = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const err = {
        status: 422,
        message: error.details,
      };
      return next(err);
    } else {
      return next();
    }
  };
};

module.exports = joiValidator;
