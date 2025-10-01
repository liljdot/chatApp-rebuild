import { config } from "dotenv"
import { NextFunction, Request, Response } from "express";
import prisma from "../db/prisma.js";
import { createUniqueProfilepic, generateToken, hashNewPassword } from "../util/auth.js";
import bcrypt from "bcryptjs";
import { CleanUser } from "../types/index.js";

config()

const getMe = (req: Request, res: Response, next: NextFunction) => {
    // must be used with requireAuth middleware which will either set req.user or req.error

    const { user, error } = req

    if (error) {
        console.log("getMe error:", error)

        return res.status(error.status || 500).json({
            status: error.status || 500,
            message: error.message || "Something went wrong",
            error: error.error || "Internal server error"
        })
    }

    res.status(200).json({
        status: 200,
        message: "get User successful",
        data: user
    })
}

const postLogin = (req: Request, res: Response) => {
    const { username, password } = req.body

    let cleanUser: CleanUser | null = null

    if (!username || !password) {
        return res.status(400).json({
            status: 400,
            message: "Please fill in all fields",
            error: "Missing fields"
        })
    }

    prisma.user.findUnique({
        where: { username }
    }) // check if user exists
        .then((user: (CleanUser & { password: string }) | null) => {
            if (!user) {
                return Promise.reject({
                    status: 400,
                    message: "Username does not exist",
                    error: "User not found"
                })
            }

            cleanUser = {
                id: user.id,
                username: user.username,
                fullName: user.fullName,
                gender: user.gender,
                profilePic: user.profilePic,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            } // remove password and set cleanUser

            return bcrypt.compare(password, user.password) // check if password is correct
        }
        )
        .then((isCorrect: boolean) => {
            if (!isCorrect) {
                return Promise.reject({
                    status: 400,
                    message: "Incorrect password",
                    error: "Invalid credentials"
                })
            }

            const token = generateToken(cleanUser!.id)
            res.cookie(
                "chatAppToken",
                token,
                {
                    maxAge: 10 * 60 * 1000, // 10 minutes
                    httpOnly: true,
                    sameSite: "strict",
                    secure: process.env.NODE_ENV != "development"
                }
            )

            res.status(200).json({
                status: 200,
                message: "Login successful",
                data: {
                    user: cleanUser,
                    token
                }
            })
        }
        )
        .catch((err: any) => {
            console.log("postLogin error:", err)

            return res.status(err.status || 500).json({
                status: err.status || 500,
                message: err.message || "Something went wrong",
                error: err.error || "Internal server error"
            })
        })
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
        .then((user: (CleanUser & { password: string }) | null) =>
            user
                ? Promise.reject({
                    status: 400,
                    message: "Username has been taken",
                    error: "Username already exists"
                })
                : hashNewPassword(password)
        )
        .then((hashedPassword: string) => prisma.user.create({
            data: {
                fullName,
                username,
                password: hashedPassword,
                gender,
                profilePic: createUniqueProfilepic(username, gender)
            }
        }))
        .then((newUser: CleanUser & {password: string}) => {
            const token = generateToken(newUser.id)

            res.cookie(
                "chatAppToken",
                token,
                {
                    maxAge: 10 * 60 * 1000, // 10 minutes
                    httpOnly: true,
                    sameSite: "strict",
                    secure: process.env.NODE_ENV != "development"
                }
            )

            res.status(201).json({
                status: 201,
                message: "User created successfully",
                data: {
                    id: newUser.id,
                    username: newUser.username,
                    fullName: newUser.fullName,
                    gender: newUser.gender,
                    profilePic: newUser.profilePic,
                    createdAt: newUser.createdAt,
                    updatedAt: newUser.updatedAt
                }
            })
        }
        )
        .catch((err: any) => {
            console.log("postSignup error:", err)

            return res.status(err.status || 500).json({
                status: err.status || 500,
                message: err.message || "Something went wrong",
                error: err.error || "Internal Server Error"
            })
        })
}

const postLogout = (req: Request, res: Response) => {
    res.cookie(
        "chatAppToken",
        "",
        { maxAge: 0 }
    )

    res.status(204).json({
        status: 204,
    })
}

export {
    getMe,
    postLogin,
    postSignup,
    postLogout,
}