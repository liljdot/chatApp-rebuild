import express from "express"
import requireAuth from "../middleware/requireAuth.js";

const messageRoutes = express()

messageRoutes.post("/send/:recipientId", requireAuth, () => {})

export default messageRoutes;