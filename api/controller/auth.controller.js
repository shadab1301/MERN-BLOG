import User from "../Model/User.model.js";
import bcryptjs from "bcryptjs";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken"

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


export const signIn=async(req,res,next)=>{
 try {
   const {email,password}=req.body
   if(!email || !password){
      throw new ApiError(400, "Email and Password should not be blank");
   }
   const user=await User.findOne({email})
   if(!user){
      throw new ApiError(404, "User not found");
   }
 
   const isPasswordValid = bcryptjs.compareSync(password,user.password)
  if(!isPasswordValid){
   throw new ApiError(401,"Password is not valid")
  }
  const access_token = jwt.sign(
    {
      data: user._id,
    },
    process.env.SECRET_KEY,
    { expiresIn: "3h" }
  );
  const userData=await User.findOne({_id:user._id}).select("-password")
  console.log(userData);
 userData.accessToken = access_token;
  res
    .status(200)
    .cookie("access_token", access_token, { httpOnly: true })
    .json(new ApiResponse(200, { data: userData ,accessToken:access_token}, "User created successfully"));
 } catch (error) {
    next(error)
 }


}