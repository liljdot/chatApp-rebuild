import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./socket/index.js";
import userRoutes from "./routes/user.route.js";
const __dirname = path.resolve();
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
if (process.env.NODE_ENV != "development") {
    app.use(express.static(path.join(__dirname, "/client/dist")));
    app.get("/{*any}", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
    });
}
server.listen(3000, () => {
    console.log("Server is running on port 3000");
});
