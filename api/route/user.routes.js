import express from "express";
import { userRegister } from "../controller/auth.controller.js";

const router=express.Router()

router.post("/register", userRegister);

// router.route("/test").get(userController);

export default router