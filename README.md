
---

# AutoFixHub

AutoFixHub is a web application designed for an automotive service center. It allows customers to book appointments, order car parts, and track their service history. The platform also provides a dashboard for mechanics and admins to manage appointments, orders, and users.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [File Structure](#file-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **User Authentication:** Secure registration and login using JWT tokens.
- **Admin Panel:** Manage users, appointments, and orders.
- **Mechanic Dashboard:** View and update assigned appointments.
- **Order Management:** Customers can order car parts and track their orders.
- **Payment Integration:** Integrated with Stripe for secure payments.
- **Responsive Design:** Works on all devices (mobile, tablet, desktop).

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios for HTTP requests

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Stripe API for payments

## Installation

### Prerequisites

Ensure you have the following installed:
- Node.js
- MongoDB
- Stripe account (for payment integration)

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/AutoFixHub.git
   cd AutoFixHub
   ```

2. **Install dependencies:**

   Navigate to the backend and frontend directories and install dependencies.

   For Backend:
   ```bash
   cd backend
   npm install
   ```

   For Frontend:
   ```bash
   cd frontend
   npm install
   ```

3. **Start the development server:**

   For Backend:
   ```bash
   npm start
   ```

   For Frontend:
   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:3000` and the backend on `http://localhost:3001`.

## Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# MongoDB connection string
MONGO_URI=mongodb://localhost:27017/autofixhub

# JWT Secret
JWT_SECRET=your_jwt_secret

# Stripe API key
STRIPE_SECRET_KEY=your_stripe_secret_key

# Node environment
NODE_ENV=development

# Port for backend server
PORT=3001
```

## Usage

### User Workflow
1. **Sign Up / Login:** Users can create an account or log in using their credentials.
2. **Browse Parts:** Users can browse available car parts and add them to the cart.
3. **Checkout:** Users can proceed to checkout and make payments using Stripe.
4. **Book Appointments:** Users can book service appointments and choose a mechanic.
5. **Order Tracking:** Users can track their order status and view past orders.

### Admin Workflow
1. **Dashboard:** Admins can view and manage users, appointments, and orders.
2. **Assign Tasks:** Admins can assign appointments to mechanics.
3. **Order Management:** Admins can view and update order statuses.

### Mechanic Workflow
1. **View Assignments:** Mechanics can view appointments assigned to them.
2. **Update Status:** Mechanics can update the status of appointments.

## API Endpoints

### Authentication
- **POST /api/auth/register:** Register a new user.
- **POST /api/auth/login:** Login and receive a JWT token.

### Orders
- **POST /api/orders:** Create a new order.
- **GET /api/orders:** Get all orders (admin only).
- **GET /api/orders/:id:** Get order by ID.

### Appointments
- **POST /api/appointments:** Create a new appointment.
- **GET /api/appointments:** Get all appointments (admin and mechanic only).
- **GET /api/appointments/:id:** Get appointment by ID.

### Users
- **GET /api/users:** Get all users (admin only).
- **GET /api/users/:id:** Get user by ID.

### Products
- **GET /api/products:** Get all products.
- **GET /api/products/:id:** Get product by ID.

## File Structure

```
AutoFixHub/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── server.js
│   └── .env
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── App.js
    │   └── index.js
    ├── public/
    ├── .env
    └── package.json
```

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or suggestions, feel free to reach out:

- Email: [your-email@example.com](mailto:ammarnazir864@gmail.com)
- LinkedIn: [Your LinkedIn Profile](https://www.linkedin.com/in/yourprofile)
- GitHub: [Your GitHub Profile](https://github.com/AmmarNazir)

---

