import express from "express"
import { getAllUsers, getUser } from "../controllers/user.controller.js"
import requireAuth from "../middleware/requireAuth.js"

const userRoutes = express()

userRoutes.get("/", requireAuth, getAllUsers)
userRoutes.get("/:id", requireAuth, getUser)

export default userRoutes