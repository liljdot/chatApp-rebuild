import express from "express"
import { postLogin, postSignup } from "../controllers/auth.controller.js"

const authRoutes = express()

authRoutes.post("/login", postLogin)

authRoutes.post("/signup", postSignup)

export default authRoutes