import User from "../Model/User.model.js";
import bcryptjs from "bcryptjs";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const userRegister = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if ([name, email, password].some((val) => val.trim() === "")) {
      throw new ApiError(400, "All fields are required");
    }
    // Check if user already exist
    const existUser = await User.findOne({ $or: [{ name }, { email }] });

    if (existUser) {
      throw new ApiError(409, "User already exist");
    }

    const encryptedPassword = bcryptjs.hashSync(password, 10);
    const user = await User.create({
      name,
      email,
      password: encryptedPassword,
    });

   
    res
      .status(201)
      .json(new ApiResponse(200, user, "User created successfully"));
  } catch (error) {
    next(error);
  }
};
