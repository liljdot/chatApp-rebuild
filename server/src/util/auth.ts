import { config } from "dotenv"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

config()

export const hashNewPassword = (password: string) => {
    return bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
}

export const generateToken = (id: string) => {
    const { JWT_SECRET } = process.env

    const token = jwt.sign(
        {
            userId: id
        },
        JWT_SECRET!,
        {
            expiresIn: "10m"
        })

    return token
}

export const createUniqueProfilepic: (username: string, gender: "male" | "female") => string = (username, gender) => {
    return `https://avatar.iran.liara.run/public/${gender == "male" ? "boy" : "girl"}?username=${username}`
}