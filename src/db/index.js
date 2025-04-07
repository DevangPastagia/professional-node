import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    console.log("\nConnecting to MongoDB ... \n");
    console.log(`${process.env.MONGO_URI}`);

    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`
    );

    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host} \n`
    );
  } catch (error) {
    console.log("MONGODB Connection Failed: ", error);
    process.exit(1);
  }
};

export default connectDB;
