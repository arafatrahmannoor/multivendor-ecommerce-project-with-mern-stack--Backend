# E-Commerce Backend

A robust Node.js/Express backend for a modern e-commerce platform, fully integrated with MongoDB and JWT authentication.

## 🚀 Features

- ✅ **Role-Based Access** - Admin, Vendor, and User roles
- ✅ **Authentication** - Secure JWT login/register endpoints
- ✅ **Product Management** - CRUD for products, categories, vendors
- ✅ **Order Workflow** - Cart, order placement, payment integration
- ✅ **Payment Integration** - SSLCommerz (or other gateway)
- ✅ **Email Notifications** - Nodemailer for order and signup alerts
- ✅ **RESTful API** - Clean, versioned endpoints for frontend integration
- ✅ **Error Handling** - Centralized error middleware

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT
- **Email**: Nodemailer
- **Payment**: SSLCommerz (or your configured gateway)
- **Environment**: dotenv

## 📦 Installation & Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Environment setup** (`.env` file):
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email_user
   EMAIL_PASS=your_email_password
   PAYMENT_KEY=your_payment_gateway_key
   ```

3. **Start development**:
   ```bash
   npm run dev
   ```

## 🌐 API Endpoints

- `/api/auth` - Login, Register, Role management
- `/api/products` - Product CRUD, search, filter
- `/api/orders` - Cart, order placement, payment
- `/api/users` - User management
- `/api/vendors` - Vendor management

## 🎯 Current Status

✅ **Production Ready** - All test/demo scripts excluded  
✅ **Secure** - .env and sensitive files ignored  
✅ **API Integration** - Ready for frontend connection  
✅ **Error Handling** - Centralized and robust

---
