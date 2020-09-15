const jwt = require('jsonwebtoken');

const getIdFromToken = (token) => {
  const decodedToken = jwt.decode(token);
  const userId = decodedToken._id;
  return userId;
};

module.exports.getIdFromToken = getIdFromToken;