const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
  }

  // Make sure token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route',
    });
  }

  try {
    // Check if MongoDB is skipped
    if (process.env.SKIP_MONGODB === 'true') {
      console.log('Using mock auth protection');
      
      // For mock auth, we'll set a dummy user if the token starts with 'mock-jwt-token-'
      if (token.startsWith('mock-jwt-token-')) {
        const email = token.replace('mock-jwt-token-', '');
        req.user = {
          id: 1,
          _id: 1,
          email,
          name: 'Mock User',
          role: 'user'
        };
        return next();
      }
    }

    // Regular JWT verification
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret_key');
    req.user = await User.findById(decoded.id);

    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route',
    });
  }
};

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role ${req.user.role} is not authorized to access this route`,
      });
    }
    next();
  };
}; 