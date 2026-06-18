# MERN Admin Dashboard

Full-stack admin dashboard built with React, Vite, React Router DOM, Axios, Tailwind CSS, Node.js, Express, MongoDB, Mongoose, and JWT authentication.

## Features

- JWT login/logout with protected frontend routes.
- Admin dashboard totals for users, products, and orders.
- User CRUD with password hashing.
- Product CRUD for catalog inventory.
- Order list with status updates.
- Responsive sidebar layout, top navbar, dashboard cards, data tables, and modal forms.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create the backend environment file:

   ```bash
   cp backend/.env.example backend/.env
   ```

3. Update `backend/.env` with your MongoDB connection string and JWT secret.

4. Seed sample data:

   ```bash
   npm run seed
   ```

5. Start the API:

   ```bash
   npm run server
   ```

6. Start the frontend in a second terminal:

   ```bash
   npm run dev
   ```

Default seeded admin login:

- Email: `admin@example.com`
- Password: `admin123`

## API Routes

- `POST /api/auth/login`
- `GET /api/dashboard/stats`
- `GET /api/users`
- `POST /api/users`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`
- `GET /api/products`
- `POST /api/products`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`
- `GET /api/orders`
- `PUT /api/orders/:id`
