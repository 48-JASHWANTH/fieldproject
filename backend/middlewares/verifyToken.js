const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req, res, next) {
  const bearerToken = req.headers.authorization;
  if (!bearerToken) {
    return res.status(401).json({
      message: 'Unauthorized access. Please login to continue',
    });
  }

  const token = bearerToken.split(' ')[1];

  try {
    jsonwebtoken.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(403).json({
      message: 'Invalid token. Please login again',
    });
  }
}

module.exports = verifyToken;
