import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(
        `Server is running on port http://localhost/${process.env.PORT || 8000}`
      );
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed!!!", error);
  });

// import express from "express";
// const app = express();
// (async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
//     app.on("error", (err) => {
//       console.error("Server error:", err);
//       throw err;
//     });

//     app.listen(process.env.PORT, () => {
//       console.log(
//         `Server is running on port http:/localhost:${process.env.PORT}/`
//       );
//     });
//   } catch (error) {
//     console.log("ERROR: ", error);
//     throw error;
//   }
// })();
