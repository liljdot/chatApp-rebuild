import express from "express"
import { postLogin, postLogout, postSignup } from "../controllers/auth.controller.js"

const authRoutes = express()

authRoutes.post("/login", postLogin)

authRoutes.post("/signup", postSignup)

authRoutes.post("/logout", postLogout)

export default authRoutes