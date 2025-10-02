import { config } from "dotenv";
import jwt from "jsonwebtoken";
import prisma from "../db/prisma.js";
config();
const requireAuth = (req, res, next) => {
    const token = req.cookies.chatAppToken;
    if (!token) {
        return res.status(401).json({
            status: 401,
            message: "You must be logged in",
            error: "No token provided"
        });
    } // immediately return with error response if no token. Pass subsequent errors to next function
    const { JWT_SECRET } = process.env;
    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
            req.error = {
                status: 401,
                message: "Unauthorized",
                error: err.message
            };
            return next(); // stop verification process and pass error response to next function
        }
        const { userId } = payload;
        prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                username: true,
                fullName: true,
                gender: true,
                profilePic: true,
                createdAt: true,
                updatedAt: true
            }
        })
            .then((cleanUser) => !cleanUser
            ? Promise.reject({
                status: 410,
                message: "User not found",
                error: "User associated with this token no longer exists"
            })
            : req.user = cleanUser)
            .catch((err) => {
            console.log("requireAuth error:", err);
            req.error = err;
        })
            .finally(next);
    });
};
export default requireAuth;
