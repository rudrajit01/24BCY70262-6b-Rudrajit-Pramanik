# 🏦 Banking API with JWT Authentication

A secure RESTful API for banking operations with JWT-based authentication. Built with Node.js, Express, MongoDB, and deployed on Vercel.

## ✨ Features

- ✅ User registration with password hashing (bcrypt)
- ✅ User login with JWT token generation
- ✅ Protected routes (require valid JWT)
- ✅ Token refresh mechanism
- ✅ Logout (invalidate refresh token)
- ✅ Rate limiting for security
- ✅ MongoDB Atlas integration
- ✅ Environment variables for configuration
- ✅ CORS enabled
- ✅ Helmet for security headers

## 🛠️ Tech Stack

- **Node.js** (v18+)
- **Express.js** - Web framework
- **MongoDB Atlas** - Database
- **Mongoose** - ODM
- **JSON Web Token** - Authentication
- **bcrypt** - Password hashing
- **Vercel** - Deployment platform

## 🚀 Live Demo

Base URL: `https://banking-api-one.vercel.app`

## 📋 API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register a new user | ❌ |
| POST | `/api/auth/login` | Login and get tokens | ❌ |
| POST | `/api/auth/refresh` | Refresh access token | ❌ |
| POST | `/api/auth/logout` | Logout user | ❌ |
| GET | `/api/bank/balance` | Get account balance | ✅ |
| POST | `/api/bank/transfer` | Transfer money | ✅ |

## 🔧 Installation & Setup

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/rudrajit01/banking-api-final.git
   cd banking-api-final
   npm install
   PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d
Create environment variables file (.env)

env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key
JWT_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d
Start the server

bash
npm start
Server will run at http://localhost:5000

## 📦 Deployment on Vercel
This project is configured for easy deployment on Vercel.

Install Vercel CLI

bash
npm i -g vercel
Login to Vercel

bash
vercel login
Deploy

bash
vercel
Follow the prompts. For production:

bash
vercel --prod
Add Environment Variables in Vercel Dashboard:

MONGO_URI

JWT_SECRET

JWT_REFRESH_SECRET

JWT_EXPIRE

JWT_REFRESH_EXPIRE

## 🔒 Environment Variables
Variable	Description	Example
PORT	Server port	5000
MONGO_URI	MongoDB connection string	mongodb+srv://user:pass@cluster.mongodb.net/banking
JWT_SECRET	Secret for access tokens	your-secret-key
JWT_REFRESH_SECRET	Secret for refresh tokens	your-refresh-secret
JWT_EXPIRE	Access token expiry	15m
JWT_REFRESH_EXPIRE	Refresh token expiry	7d
🧪 Testing with Postman
## Register a new user

text
POST https://banking-api-final.vercel.app/api/auth/register
Body: { "email": "user@example.com", "password": "secure123" }
Login

text
POST https://banking-api-final.vercel.app/api/auth/login
Body: { "email": "user@example.com", "password": "secure123" }
Response contains accessToken and refreshToken.

## Access protected route

text
GET https://banking-api-final.vercel.app/api/bank/balance
Headers: { "Authorization": "Bearer <accessToken>" }
Refresh token

text
POST https://banking-api-final.vercel.app/api/auth/refresh
Body: { "refreshToken": "<refreshToken>" }
Logout

text
POST https://banking-api-final.vercel.app/api/auth/logout
Body: { "refreshToken": "<refreshToken>" }
## 📁 Project Structure
text
banking-api/
├── controllers/        # Route controllers
│   ├── authController.js
│   └── bankController.js
├── middleware/         # Custom middleware
│   └── auth.js
├── models/            # Database models
│   └── User.js
├── routes/            # API routes
│   ├── auth.js
│   └── bank.js
├── config/            # Configuration files
│   └── db.js
├── .env               # Environment variables
├── .gitignore         # Git ignore file
├── package.json       # Dependencies
├── server.js          # Main application file
└── vercel.json        # Vercel configuration
## 📝 License
This project is created for educational purposes as part of academic curriculum.

# 👨‍💻 Author
Rudrajit Pramanik
GitHub: @rudrajit01
