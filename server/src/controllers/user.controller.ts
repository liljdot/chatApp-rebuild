import { Request, Response } from "express";
import prisma from "../db/prisma.js";
import { CleanUser } from "../types/index.js";

const getAllUsers = (req: Request, res: Response) => {
    const { error, user } = req

    if (error) {
        return res.status(error.status || 500).json({
            status: error.status || 500,
            message: error.message || "Something went wrong",
            error: error.error || "Internal server error"
        })
    }

    if (!user) {
        return res.status(401).json({
            status: 401,
            message: "You must be logged in to view conversations",
            error: "Unauthorized"
        })
    }

    let Jehu: CleanUser

    prisma.user.findUnique({
        where: {
            username: "Jdot"
        },
        select: {
            id: true,
            username: true,
            createdAt: true,
            profilePic: true,
            fullName: true,
            gender: true,
            updatedAt: true
        }
    })
        .then(user => !user ? Promise.reject("User not found") : Jehu = user)
        .then(user => prisma.user.findMany({
            take: 10,
            orderBy: {
                createdAt: "desc"
            }
        }))
        .then(users => res.status(200).json({
            status: 200,
            message: "Users fetched successfully",
            data: [
                Jehu,
                ...users.filter(u => u.id != Jehu.id)
            ]
        }))
        .catch(err => res.status(500).json({
            status: err.status || 500,
            message: err.message || "Something went wrong",
            error: err.error || "Internal server error"
        }))
}

export {
    getAllUsers
}