const jwt = require('jsonwebtoken');

// Middleware to authenticate user
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const decodedToken = jwt.verify(token, 'secret');
    req.user = { userId: decodedToken.userId, username: decodedToken.username, role: decodedToken.role };
    next();
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = { verifyToken };
