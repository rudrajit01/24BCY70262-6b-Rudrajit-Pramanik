const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer TOKEN" থেকে শুধু TOKEN নেওয়া

  if (!token) {
    return res.sendStatus(401); // 401 Unauthorized (টোকেন নেই)
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // 403 Forbidden (টোকেন মেয়াদোত্তীর্ণ বা ভুল)
    }
    req.user = user; // ইউজারের তথ্য সংযুক্ত করা
    next(); // পরবর্তী মিডলওয়্যার বা কন্ট্রোলারে যাওয়া
  });
};

module.exports = authenticateToken;