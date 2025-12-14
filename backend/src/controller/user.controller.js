import {ApiError} from "../utils/ApiError.js";
import asynchandler from '../utils/asynchandler.js'
import {User} from '../model/user.model.js'

const getAccessAndRefreshToken = async (userId) => {
  const user = await User.findById(userId);

  const accessToken = await user.getAccessToken();
  const refreshToken = await user.getRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { refreshToken, accessToken };
};


export const registerUSer = asynchandler(async (req, res) => {
  const { username, email, password } = req.body;

  if ([username, email, password].some((field) => field.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ email });
  console.log("existing user : ",existingUser);
  
  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  const newUser = await User.create({
    username,
    email,
    password,
  });

  return res
    .status(200)
    .json({ newUser, message: "User registered successfully" });
});

export const loginUser = asynchandler(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some((field) => field.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, "Invalid email or password");
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid email or password");
  }

  const { refreshToken, accessToken } = await getAccessAndRefreshToken(
    user?._id
  );

  user.refreshToken = refreshToken;
  await user.save();

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: false,
    // sameSite : "strict",
    // sameSite:"strict"
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({ loggedInUser, message: "User logged Successfully" });
});

export const logOutUser = asynchandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user?._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: false,
    // sameSite : "strict",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({ data: {}, message: "User logged out successfully" }); 
});