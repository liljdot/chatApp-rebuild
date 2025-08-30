import { Request, Response } from "express";
import prisma from "../db/prisma.js";

const getConversations = (req: Request, res: Response) => {
    // must be used with requireAuth middleware which will either set req.user or req.error

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

    prisma.conversation.findMany({
        where: {
            participantIds: { hasSome: [user.id] }
        },
        include: {
            User: {
                where: {
                    id: {
                        not: user.id
                    }
                },
                select: {
                    id: true,
                    profilePic: true,
                    fullName: true
                }
            },
            Message: {
                take: 1,
                orderBy: { createdAt: "desc" }
            }
        },
        orderBy: { updatedAt: "desc" },
    })
        .then(conversations => !conversations
            ? Promise.reject({
                status: 404,
                message: "No conversations found",
                error: "No conversations"
            })
            : res.status(200).json({
                status: 200,
                message: "Get conversations successful",
                data: conversations
            })
        )
        .catch(err => {
            console.log("getConversations error:", err)

            return res.status(err.status || 500).json({
                status: err.status || 500,
                message: err.message || "Something went wrong",
                error: err.error || "Internal server error"
            })
        })
}

const getConversationMessages = (req: Request, res: Response) => {
    // must be used with requireAuth middleware which will either set req.user or req.error

    const { params: { conversationId }, error, user } = req

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
            message: "You must be logged in to view messages",
            error: "Unauthorized"
        })
    }

    if (!conversationId) {
        return res.status(400).json({
            status: 400,
            message: "Please provide a conversationId",
            error: "Missing conversationId"
        })
    }

    prisma.conversation.findUnique({
        where: { id: conversationId },
        include: {
            Message: {
                orderBy: { createdAt: "asc" }
            }
        }
    })
        .then(conversation => !conversation
            ? Promise.reject({
                status: 404,
                message: "Conversation not found",
                error: "Invalid conversationId"
            })
            : conversation
        )
        .then(conversation => !conversation.participantIds.includes(user.id)
            ? Promise.reject({
                status: 403,
                message: "You are not a participant in this conversation",
                error: "Forbidden"
            })
            : res.status(200).json({
                status: 200,
                message: "Get conversation messages successful",
                data: conversation.Message
            })
        )
        .catch(err => {
            console.log("getConversationMessages error:", err)

            return res.status(err.status || 500).json({
                status: err.status || 500,
                message: err.message || "Something went wrong",
                error: err.error || "Internal server error"
            })
        })

    // const { params: { conversationId }, error, user } = req

    // if (error) {
    //     console.log("auth error:", error) // because requireAuth runs first, any error it sets will be related to auth

    //     return res.status(error.status || 500).json({
    //         status: error.status || 500,
    //         message: error.message || "Something went wrong",
    //         error: error.error || "Internal server error"
    //     })
    // }

    // if (!user) {
    //     return res.status(401).json({
    //         status: 401,
    //         message: "You must be logged in to view messages",
    //         error: "Unauthorized"
    //     })
    // }

    // if (!conversationId) {
    //     return res.status(400).json({
    //         status: 400,
    //         message: "Please provide a conversationId",
    //         error: "Missing conversationId"
    //     })
    // }

    // prisma.conversation.findUnique({
    //     where: { id: conversationId },
    //     include: {
    //         Message: {
    //             orderBy: { createdAt: "asc" } // order messages by createdAt ascending
    //         }
    //     }
    // })
    //     .then(conversation => {
    //         if (!conversation) {
    //             return res.status(404).json({
    //                 status: 404,
    //                 message: "Conversation not found",
    //                 error: "Invalid conversationId"
    //             })
    //         }

    //         // check if user is a participant in the conversation
    //         if (!conversation.participantIds.includes(user.id)) {
    //             return res.status(403).json({
    //                 status: 403,
    //                 message: "You are not a participant in this conversation",
    //                 error: "Forbidden"
    //             })
    //         }

    //         return res.status(200).json({
    //             status: 200,
    //             message: "Messages retrieved successfully",
    //             data: conversation.Message
    //         })
    //     })
    //     .catch(err => {
    //         console.log("getConversationMessages error:", err)

    //         return res.status(500).json({
    //             status: 500,
    //             message: "Something went wrong",
    //             error: "Internal server error"
    //         })
    //     })
}

const postSendMessage = (req: Request, res: Response) => {
    // must be used with requireAuth middleware which will either set req.user or req.error

    const { params: { recipientId }, body: { message }, error, user: sender } = req

    if (error) {
        console.log("auth error:", error) // because requireAuth runs first, any error it sets will be related to auth

        return res.status(error.status || 500).json({
            status: error.status || 500,
            message: error.message || "Something went wrong",
            error: error.error || "Internal server error"
        })
    }

    if (!message) {
        {
            return res.status(400).json({
                status: 400,
                message: "Please provide a message",
                error: "Missing message"
            })
        }
    }

    if (!sender) {
        return res.status(401).json({
            status: 401,
            message: "You must be logged in to send messages",
            error: "Unauthorized"
        })
    }

    if (!recipientId) {
        return res.status(400).json({
            status: 400,
            message: "Please provide a recipientId",
            error: "Missing recipientId"
        })
    }

    // check if conversation between sender and recipient already exists
    prisma.conversation.findFirst({
        where: {
            AND: [
                {
                    User: { some: { id: sender.id } }
                },
                {
                    User: { some: { id: recipientId } }
                }
            ]
        }
    })
        .then(conversation => conversation
            ? conversation
            : prisma.conversation.create({
                data: {
                    participantIds: [sender.id, recipientId], // add id's to participant id's field
                    User: {
                        connect: [
                            { id: sender.id },
                            { id: recipientId }
                        ] // connnect users to conversations (many to many) table relation. must be done with many to many relations
                    }
                }
            })
        )
        .then(conversation => prisma.$transaction([
            prisma.message.create({
                data: {
                    conversationId: conversation.id,
                    senderId: sender.id,
                    body: message
                }
            }), // connect message to conversation (many to one) table relation is not done here because it is done automatically via conversationId foreign key
            prisma.conversation.update({
                where: { id: conversation.id },
                data: { updatedAt: new Date() } // update conversation's updatedAt field to current time
            })
        ]))
        .then(([message]) => res.status(201).json({
            status: 201,
            message: "Message sent successfully",
            data: message
        }))
        .catch(err => {
            console.log("postSendMessage error:", err)

            return res.status(500).json({
                status: 500,
                message: "Something went wrong",
                error: "Internal server error"
            })
        })
}

export {
    getConversations,
    getConversationMessages,
    postSendMessage
}