const mongoose = require("mongoose");

/*
const DB = process.env.DATABASE_APPLICATON_URL.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
*/

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
};

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(
      process.env.DATABASE_APPLICATON_URL,
      options
    );
    console.log(`MongoDB Connected: ${connect.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
