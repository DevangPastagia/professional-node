import { Router } from "express";

// Import the controller functions
import { registerUser } from "../controllers/user.controller.js";

// Import the middleware for file uploads
import { upload } from "../middlewares/multer.middleware.js";

// Create a new router instance
const router = Router();

// Define the routes and associate them with controller functions
router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);

export default router;
