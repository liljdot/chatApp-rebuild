import express from "express"
import { getAllUsers } from "../controllers/user.controller.js"
import requireAuth from "../middleware/requireAuth.js"

const userRoutes = express()

userRoutes.get("/", requireAuth, getAllUsers)

export default userRoutes