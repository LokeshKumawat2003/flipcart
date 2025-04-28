# Flipcart Backend

This is the backend API for the Flipcart e-commerce website with admin panel functionality.

## Features

- User authentication and authorization
- Product management
- Category management
- Order processing
- User management (Admin)
- File uploads for product and category images
- Role-based access control

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Multer for file uploads

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
   ```
   git clone <repository-url>
   cd flipcart/backend
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a .env file in the root directory with the following variables
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/flipcart
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=30d
   ```

4. Start the development server
   ```
   npm run dev
   ```

5. For production deployment
   ```
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile

### Products
- `GET /api/products` - Get all products with pagination and filtering
- `GET /api/products/:id` - Get a single product
- `POST /api/products` - Create a new product (Admin only)
- `PUT /api/products/:id` - Update a product (Admin only)
- `DELETE /api/products/:id` - Delete a product (Admin only)
- `POST /api/products/:id/reviews` - Add a product review

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get a single category
- `POST /api/categories` - Create a new category (Admin only)
- `PUT /api/categories/:id` - Update a category (Admin only)
- `DELETE /api/categories/:id` - Delete a category (Admin only)

### Users (Admin Only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get a single user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user
- `PUT /api/users/profile/update` - Update user's own profile (Any authenticated user)

### Orders
- `GET /api/orders` - Get all orders (Admin only)
- `GET /api/orders/my-orders` - Get current user's orders
- `GET /api/orders/:id` - Get a single order
- `POST /api/orders` - Create a new order
- `PUT /api/orders/:id/pay` - Update order to paid
- `PUT /api/orders/:id/deliver` - Update order to delivered (Admin only)
- `PUT /api/orders/:id/status` - Update order status (Admin only)
- `DELETE /api/orders/:id` - Delete an order (Admin only)

## Admin Panel

The admin panel provides the following functionality:
- User management
- Product management
- Category management 
- Order management
- Dashboard with sales statistics

## License

[MIT](LICENSE) 