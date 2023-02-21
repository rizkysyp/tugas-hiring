const jwt = require("jsonwebtoken");

const generateToken = (payload) => {
  const verifyOpts = {
    expiresIn: "1h",
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY, verifyOpts);
  return token;
};

const generateRefreshToken = (payload) => {
  const verifyOpts = {
    expiresIn: "24h",
  };
  const token = jwt.sign(payload, process.env.SECRET_KEY, verifyOpts);
  return token;
};
const verify = async (token) => {
  const result = await jwt.verify(token, process.env.SECRET_KEY);
  return result;
};

module.exports = {
  generateRefreshToken,
  generateToken,
  verify,
};
