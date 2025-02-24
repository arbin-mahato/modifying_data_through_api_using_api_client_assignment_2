const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_DB_URI);
    console.log(`Connected to MongoDB Atlas: ${connection.host}`);
  } catch (error) {
    console.log(`MongoDB connection error`, error);
  }
};

module.exports = connectDB;
