const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const { getBalance, transfer } = require('../controllers/bankController');

// সমস্ত ব্যাংক রুট প্রটেক্টেড - আগে authenticateToken মিডলওয়্যার দিয়ে যাচাই করবে
router.get('/balance', authenticateToken, getBalance);
router.post('/transfer', authenticateToken, transfer);

module.exports = router;