const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const userRoutes = require('./routes/users');
const orderRoutes = require('./routes/orders');

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(express.json({
  verify: (req, res, buf, encoding) => {
    try {
      JSON.parse(buf.toString());
    } catch (e) {
      // Don't throw an error, just let the regular error handling middleware deal with it
      req.body = {}; // Set an empty body to prevent further errors
      console.error('Invalid JSON in request body:', e.message);
    }
  },
  limit: '10mb' // Set reasonable limit for JSON payloads
}));

// Add error handling middleware for JSON parsing errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('JSON Parse Error:', err.message);
    return res.status(400).json({ 
      success: false, 
      message: 'Invalid JSON in request body',
      error: err.message
    });
  }
  next(err);
});

// CORS configuration - Simplify for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Serve uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Connect to DB
const connectDB = async () => {
  try {
    // Allow connection without MongoDB for now
    if (process.env.SKIP_MONGODB === 'true') {
      console.log('MongoDB connection skipped');
      return;
    }
    
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/flipcart', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
      socketTimeoutMS: 45000, // Increase socket timeout
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.log('Please make sure MongoDB is installed and running on your system');
    console.log('Or update your .env file with a valid MongoDB Atlas connection string');
    // Don't exit on connection error - allow API to still function
    console.log('Continuing without MongoDB connection');
  }
};

connectDB();

const PORT = process.env.PORT || 5000;
const ALTERNATIVE_PORT = 5001;

const startServer = () => {
  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  })
  .on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${PORT} is busy, trying alternative port ${ALTERNATIVE_PORT}`);
      app.listen(ALTERNATIVE_PORT, () => {
        console.log(`Server running on alternative port ${ALTERNATIVE_PORT}`);
      });
    } else {
      console.error('Server error:', err);
    }
  });
};

startServer(); 