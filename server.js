require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const app = express();

// ডাটাবেস কানেক্ট করুন
connectDB();

// নিরাপত্তা মিডলওয়্যার
app.use(helmet());
app.use(cors());

// রেট লিমিটিং - বিশেষ করে লগইন ও রেজিস্টারে
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 মিনিট
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api/auth', limiter);

// JSON পার্সার
app.use(express.json());

// 👇 নতুন অংশ: রুট এন্ডপয়েন্ট (GET /) - একটি স্বাগত পৃষ্ঠা দেখাবে
app.get('/', (req, res) => {
  res.send(`
    <h1>🏦 Banking API</h1>
    <p>Welcome to the JWT Authentication Banking API.</p>
    <h3>Available Endpoints:</h3>
    <ul>
      <li><strong>POST /api/auth/register</strong> - Register a new user</li>
      <li><strong>POST /api/auth/login</strong> - Login and get tokens</li>
      <li><strong>GET /api/bank/balance</strong> - Get account balance (protected)</li>
      <li><strong>POST /api/bank/transfer</strong> - Transfer money (protected)</li>
      <li><strong>POST /api/auth/refresh</strong> - Refresh access token</li>
      <li><strong>POST /api/auth/logout</strong> - Logout (invalidate refresh token)</li>
    </ul>
    <p>Use Postman or any API client to test the endpoints.</p>
  `);
});

// রাউট সংযুক্ত করা
app.use('/api/auth', require('./routes/auth'));
app.use('/api/bank', require('./routes/bank'));

// এরর হ্যান্ডলিং
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));