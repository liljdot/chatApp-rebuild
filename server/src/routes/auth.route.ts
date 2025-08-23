import express from "express"
import { postLogin } from "../controllers/auth.controller.js"

const authRoutes = express()

authRoutes.get("/login", postLogin)

export default authRoutes