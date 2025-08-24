import { Request, Response } from "express";
import prisma from "../db/prisma.js";
import { createUniqueProfilepic, hashNewPassword } from "../util/auth.js";

const postLogin = (req: Request, res: Response) => {
    res.send("Login route, baby!");
}

const postSignup = (req: Request, res: Response) => {
    const {
        username,
        fullName,
        password,
        confirmPassword,
        gender
    } = req.body

    if (!username || !fullName || !password || !confirmPassword || !gender) {
        return res.status(400).json({
            status: 400,
            message: "Please fill in all fields",
            error: "Missing fields"
        })
    }

    if (password !== confirmPassword) {
        return res.status(400).json({
            status: 400,
            message: "Passwords do not match",
            error: "Passwords do not match"
        })
    }

    prisma.user.findUnique({
        where: { username }
    })
        .then(user =>
            user
                ? Promise.reject({
                    status: 400,
                    message: "Username has been taken",
                    error: "Username already exists"
                })
                : hashNewPassword(password)
        )
        .then(hashedPassword => prisma.user.create({
            data: {
                fullName,
                username,
                password: hashedPassword,
                gender,
                profilePic: createUniqueProfilepic(username, gender)
            }
        }))
        .then(newUser => newUser 
            // TODO: Create a JWT token and send it to the client
        )
}

export {
    postLogin
}