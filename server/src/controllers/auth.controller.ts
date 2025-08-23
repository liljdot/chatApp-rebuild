import { Request, Response } from "express";

const postLogin = (req: Request, res: Response) => {
    res.send("Login route, baby!");
}

export {
    postLogin
}