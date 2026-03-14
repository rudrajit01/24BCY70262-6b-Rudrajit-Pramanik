const mongoose = require('mongoose');

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) {
    console.log('✅ Using existing database connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    console.log('🔄 Connecting to MongoDB...');
    cached.promise = mongoose.connect(process.env.MONGO_URI, opts).then((mongoose) => {
      console.log('✅ MongoDB connected successfully');
      return mongoose;
    }).catch(err => {
      console.error('❌ MongoDB connection error:', err);
      // Return null instead of crashing
      return null;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
};

module.exports = connectDB;
