const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.LOMONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `connected to mongoDB database ${conn.connection.host}`.bgMagenta.black
    );
  } catch (error) {
    console.log(`error in DB ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
