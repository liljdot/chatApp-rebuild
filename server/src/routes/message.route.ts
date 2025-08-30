import express from "express"
import requireAuth from "../middleware/requireAuth.js";
import { getConversationMessages, postSendMessage } from "../controllers/message.controller.js";

const messageRoutes = express()

messageRoutes.get("/:conversationId", requireAuth, getConversationMessages)
messageRoutes.post("/send/:recipientId", requireAuth, postSendMessage)

export default messageRoutes;