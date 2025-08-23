import express from "express"

const authRoutes = express()

authRoutes.get("/login", (req, res) => {
    res.send("Login route")
})

export default authRoutes