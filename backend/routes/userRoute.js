import express from "express"
import { loginUser,registerUSer } from "../controller/userController.js"

const userRouter=express.Router()

userRouter.post("/register",registerUSer)
userRouter.post("/login",loginUser)

export default userRouter;