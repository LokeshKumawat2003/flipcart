# Flipcart E-Commerce Platform

A full-stack e-commerce platform with admin panel built using the MERN stack (MongoDB, Express, React, Node.js).

## Project Structure

```
flipcart/
├── backend/         # Node.js/Express backend
├── frontend/        # React frontend
```

## Features

- User authentication and authorization
- Product management
- Category management
- Order processing
- Admin dashboard
- File uploads for product and category images
- Role-based access control

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Setting Up the Backend

1. Navigate to the backend directory:
   ```
   cd flipcart/backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create environment variables:
   ```
   node setup-env.js
   ```
   This will create a `.env` file with default values. Edit it to match your environment if needed.

4. Start the development server:
   ```
   npm run dev
   ```
   The server will run on http://localhost:5000 by default.

### Setting Up the Frontend

1. Navigate to the frontend directory:
   ```
   cd flipcart/frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create environment variables:
   ```
   node setup-env.cjs
   ```
   This will create a `.env.local` file with the API URL pointing to the backend.

4. Start the development server:
   ```
   npm run dev
   ```
   The frontend will run on http://localhost:5173 by default.

## Connecting Frontend to Backend

The frontend and backend are connected through API calls. The integration is handled by:

1. **Environment Variables**:
   - Backend: `.env` contains `FRONTEND_URL` for CORS configuration
   - Frontend: `.env.local` contains `VITE_API_URL` pointing to the backend API

2. **API Service**:
   - `apiService.js` provides a central place for all API calls to the backend
   - Handles authentication headers, error responses, and organizes endpoints by resource

3. **Authentication Flow**:
   - JWT tokens are stored in localStorage
   - The `AuthContext` manages user state throughout the application
   - API requests automatically include the authentication token

4. **Component Integration**:
   - Components like `ProductList` and admin `Dashboard` use the API services to fetch data

## Admin Panel Access

To access the admin panel:

1. Register a new user
2. Use MongoDB Compass or similar tool to manually change the user's role to "admin" in the database
3. Log in with the admin user to access admin features

## API Endpoints

See the [backend README](./backend/README.md) for detailed API documentation.

## License

MIT 