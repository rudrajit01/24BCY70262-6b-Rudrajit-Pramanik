// @desc    ইউজারের অ্যাকাউন্ট ব্যালেন্স দেখায় (উদাহরণস্বরূপ স্ট্যাটিক ডাটা)
// @route   GET /api/bank/balance
const getBalance = (req, res) => {
  // এখানে আসল অ্যাপে ডাটাবেস থেকে ইউজারের ব্যালেন্স আনা হবে
  res.json({
    message: `Balance for user ${req.user.email}`,
    balance: 1000.50 // উদাহরণ হিসেবে ১০০০.৫০ টাকা দেখানো হচ্ছে
  });
};

// @desc    টাকা ট্রান্সফার করে (উদাহরণ)
// @route   POST /api/bank/transfer
const transfer = (req, res) => {
  const { toAccount, amount } = req.body;

  // ইনপুট ভ্যালিডেশন (সহজভাবে)
  if (!toAccount || !amount) {
    return res.status(400).json({ message: 'toAccount and amount are required' });
  }

  // এখানে আসল ট্রান্সফারের লজিক হবে (ব্যালেন্স চেক, লেনদেন সংরক্ষণ ইত্যাদি)
  res.json({
    message: `Transferred $${amount} to ${toAccount} from user ${req.user.email}`,
    success: true
  });
};

module.exports = {
  getBalance,
  transfer
};