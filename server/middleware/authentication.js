const jwt = require('jsonwebtoken');
require('dotenv/config')

 const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
      if (error) {
        return res.status(401).json({ message: 'Invalid token' });
      }
  
      // Store the decoded payload data in the request for later use
         req.user = decoded;
         next();
    });
  };

  module.exports = authenticateToken;