import express from "express"
import { getMe, postLogin, postLogout, postSignup } from "../controllers/auth.controller.js"
import requireAuth from "../middleware/requireAuth.js"

const authRoutes = express()

authRoutes.get("/me", requireAuth, getMe)

authRoutes.post("/login", postLogin)

authRoutes.post("/signup", postSignup)

authRoutes.post("/logout", postLogout)

export default authRoutes