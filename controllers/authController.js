const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRE }
  );
};

const register = async (req, res) => {
  try {
    console.log('📩 Register request received');
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // ইউজার আগে থেকে আছে কিনা চেক
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // পাসওয়ার্ড হ্যাশ করা (এখানেই করছি)
    console.log('🔐 Hashing password...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // নতুন ইউজার তৈরি (হ্যাশ করা পাসওয়ার্ড সহ)
    const user = new User({ 
      email, 
      password: hashedPassword 
    });
    await user.save();
    console.log('✅ User saved with hashed password:', user.password);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('🔥 Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('🔑 Login attempt for email:', email);

    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('✅ User found in DB:', user.email);
    console.log('Stored hashed password:', user.password); // হ্যাশ দেখাবে

    const isMatch = await user.comparePassword(password);
    console.log('🔐 Password match result:', isMatch);

    if (!isMatch) {
      console.log('❌ Password does not match');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // টোকেন জেনারেট অংশ অপরিবর্তিত থাকবে
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.error('🔥 Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const refresh = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(401);
  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findOne({ _id: decoded.id, refreshToken });
    if (!user) return res.sendStatus(403);
    const newAccessToken = generateAccessToken(user);
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.sendStatus(403);
  }
};

const logout = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(204);
  try {
    const user = await User.findOne({ refreshToken });
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(500);
  }
};

module.exports = {
  register,
  login,
  refresh,
  logout
};