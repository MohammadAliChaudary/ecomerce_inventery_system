const bcrypt = require("bcrypt");

const hashedString = async (storedValue, rounds) => {
  const hashedData = await bcrypt.hash(storedValue, rounds);
  return hashedData;
};

const compareString = async (storedValue, newValue) => {
  const match = await bcrypt.compare(newValue, storedValue);
  return match;
};

module.exports = {
  hashedString,
  compareString,
};
