const jwt = require('jsonwebtoken');
const secretKey = 'yourSecretKey'; // Replace with your actual secret key

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - No token provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }

    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
