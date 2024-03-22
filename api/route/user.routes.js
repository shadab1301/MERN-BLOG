import express from "express";
import { signIn, userRegister } from "../controller/auth.controller.js";

const router=express.Router()

router.post("/register", userRegister);

router.post("/signin", signIn);

// router.route("/test").get(userController);

export default router