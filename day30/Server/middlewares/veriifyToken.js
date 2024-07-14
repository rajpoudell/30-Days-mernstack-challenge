const jwt = require('jsonwebtoken');
const secretKey = 'secretkeyappearshere'; // Replace with your actual secret key

// Middleware to authenticate and verify user role(s)
const verifyTokenAndRole = (requiredRoles) => {
  return (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return res.status(401).json({ message: 'Unauthorized - Authorization header missing' });
    }

    const token = authorizationHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized - Token missing' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized - Invalid token' });
      }
      req.user = decoded;
      console.log(req.user);


      // Check if the user's role matches one of the required roles
      const rolesArray = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];
      if (!rolesArray.includes(req.user.role)) {
        return res.status(403).json({ message: 'Forbidden - You do not have the required role' });
      }

      next();
    });
  };
};

module.exports = verifyTokenAndRole;
