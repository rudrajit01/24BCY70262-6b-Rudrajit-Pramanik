const express = require('express');
const router = express.Router();
const { body } = require('express-validator'); // নতুন
const {
  register,
  login,
  refresh,
  logout
} = require('../controllers/authController');
const validate = require('../middleware/validate'); // আমরা এই মিডলওয়্যার তৈরি করব

// রেজিস্ট্রেশন ভ্যালিডেশন
router.post('/register', [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], validate, register);

// লগইন ভ্যালিডেশন
router.post('/login', [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password is required')
], validate, login);

router.post('/refresh', refresh);
router.post('/logout', logout);

module.exports = router;