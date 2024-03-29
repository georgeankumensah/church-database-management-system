const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI).then(() => {});
  } catch (err) {
    console.log("ERROR AT DB CONNECT \n", err);
  }
};

module.exports = connectDB;
