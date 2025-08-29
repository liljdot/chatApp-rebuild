import express from "express"
import requireAuth from "../middleware/requireAuth.js";
import { postSendMessage } from "../controllers/message.controller.js";

const messageRoutes = express()

messageRoutes.post("/send/:recipientId", requireAuth, postSendMessage)

export default messageRoutes;