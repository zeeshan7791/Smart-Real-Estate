import mongoose from "mongoose";
import colors from "colors";


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

export default connectDB;
