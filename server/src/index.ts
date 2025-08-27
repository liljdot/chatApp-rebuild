import express from "express"
import cookieParser from "cookie-parser"

import authRoutes from "./routes/auth.route.js"

const app = express()

app.use(express.json()) // Middleware to parse JSON bodies
app.use(cookieParser()) // Middleware to parse cookies

app.use("/api/auth", authRoutes)

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})