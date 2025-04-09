import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { apiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // 1. Get user details from the request body
  const { fullName, userName, email, password } = req.body;

  // 2. Validate user details
  if ([fullName, userName, email, password].some((field) => !field)) {
    throw new apiError(400, "Please fill all the fields");
  }

  // 3. Check if email is valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new apiError(400, "Please provide a valid email address");
  }

  // 4. Check if password is strong
  // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  // if (!passwordRegex.test(password)) {
  //   return res.status(400).json({
  //     message:
  //       "Please provide a strong password with at least 8 characters, one uppercase letter, one lowercase letter, and one digit",
  //   });
  // }

  // 5. Check if user already exists
  const existingUser = await User.findOne({
    $or: [{ email }, { userName }],
  });
  if (existingUser) {
    throw new apiError(409, "User with email or username already exists");
  }

  const avatarLocalePath = req.files?.avatar[0]?.path;
  const coverImageLocalePath = req.files?.coverImage[0]?.path;

  if (!avatarLocalePath) {
    throw new apiError(400, "Please provide an avatar");
  }

  const avatar = await uploadOnCloudinary(avatarLocalePath);
  const covertImage = await uploadOnCloudinary(coverImageLocalePath);

  if (!avatar) {
    throw new apiError(400, "Failed to upload avatar");
  }

  if (!covertImage) {
    throw new apiError(400, "Failed to upload cover image");
  }

  const user = await User.create({
    fullName,
    userName,
    email,
    password,
    avatar: avatar.url,
    coverImage: covertImage?.url || "",
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new apiError(500, "Failed to register user");
  }

  return res
    .status(201)
    .json(new apiResponse(201, "User created successfully"));

  // 6. Hash password
  // const hashedPassword = await bcrypt.hash(password, 10);

  // 7. Create new user
  // const newUser = new User({
  //   fullName,
  //   userName,
  //   email,
  //   password: hashedPassword,
  //   avatar: req.file ? req.file.path : "",
  //   coverImage: req.file ? req.file.path : "",
  // });
  // await newUser.save();
});

export { registerUser };
