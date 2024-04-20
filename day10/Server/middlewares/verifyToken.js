const jwt = require('jsonwebtoken');
const secretKey = 'yourSecretKey';  

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - No token provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }

    // Attach the decoded user information to the request for later use in the protected route
    req.user = decoded;
    return next();
  });
};

module.exports = verifyToken;
