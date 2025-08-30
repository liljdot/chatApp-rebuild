import express from "express"
import requireAuth from "../middleware/requireAuth.js";
import { getConversationMessages, getConversations, postSendMessage } from "../controllers/message.controller.js";

const messageRoutes = express()

messageRoutes.get("/conversations", requireAuth, getConversations)
messageRoutes.get("/:conversationId", requireAuth, getConversationMessages)
messageRoutes.post("/send/:recipientId", requireAuth, postSendMessage)

export default messageRoutes;