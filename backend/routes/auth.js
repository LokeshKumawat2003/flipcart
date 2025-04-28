const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const User = require('../models/User');

// Mock user data for when MongoDB is skipped
const mockUsers = [];
let mockUserId = 1;

// @route   POST /api/auth/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    // Validate request body
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid request body',
      });
    }

    const { name, email, password } = req.body;
    
    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email and password',
      });
    }

    console.log('Registration attempt:', { name, email });

    // Check if SKIP_MONGODB is enabled
    if (process.env.SKIP_MONGODB === 'true') {
      console.log('Using mock user registration');
      
      // Check if user already exists in mock data
      const existingUser = mockUsers.find(u => u.email === email);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'User already exists',
        });
      }
      
      // Create mock user
      const newUser = {
        _id: mockUserId++,
        name,
        email,
        password, // In a real app, this would be hashed
        role: 'user',
        createdAt: new Date(),
        getSignedJwtToken: () => 'mock-jwt-token-' + email
      };
      
      mockUsers.push(newUser);
      
      // Return response
      const token = newUser.getSignedJwtToken();
      
      return res.status(201).json({
        success: true,
        token,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
        },
      });
    }

    // Regular MongoDB flow
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    // Create user
    user = await User.create({
      name,
      email,
      password,
    });

    // Create token
    const token = user.getSignedJwtToken();

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: err.message,
    });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    // Validate request body
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid request body',
      });
    }

    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email and password',
      });
    }

    // Check if SKIP_MONGODB is enabled
    if (process.env.SKIP_MONGODB === 'true') {
      console.log('Using mock user login');
      
      // Check for user in mock data
      const user = mockUsers.find(u => u.email === email);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials',
        });
      }

      // Check if password matches (simple check for mock data)
      if (user.password !== password) {
        return res.status(401).json({
          success: false,
          message: 'Invalid credentials',
        });
      }

      // Create token
      const token = user.getSignedJwtToken();

      return res.status(200).json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    }

    // Regular MongoDB flow
    // Check for user
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Create token
    const token = user.getSignedJwtToken();

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: err.message,
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current logged in user
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    // Check if SKIP_MONGODB is enabled
    if (process.env.SKIP_MONGODB === 'true') {
      // This would require the protect middleware to set req.user
      // For now, just return a mock response
      return res.status(200).json({
        success: true,
        data: {
          _id: 1,
          name: 'Mock User',
          email: 'mock@example.com',
          role: 'user',
        },
      });
    }

    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving profile',
      error: err.message,
    });
  }
});

module.exports = router; 