import { Request, Response } from "express";

const postSendMessage = (req: Request, res: Response) => {
    const { recipientId } = req.params
    console.log(recipientId)
}

export {
    postSendMessage
}