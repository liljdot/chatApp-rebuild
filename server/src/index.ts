import express from "express"
import cookieParser from "cookie-parser"

import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import { app, server } from "./socket/index.js"

app.use(express.json()) // Middleware to parse JSON bodies
app.use(cookieParser()) // Middleware to parse cookies

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

server.listen(3000, () => {
    console.log("Server is running on port 3000")
})