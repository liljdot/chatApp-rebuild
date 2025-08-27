import "express"
import { CleanUser } from "../index.ts"

declare module "express" {
    interface Request {
        user?: CleanUser
        error?: {
            status: 400 | 401 | 403 | 404 | 429 | 500
            message: string
            error: any
        }
    }

    interface Response {
        json: (obj: {
        status: 200 | 201
        message: string
        data: any
    }
        | {
            status: 204
        }
        | {
            status: 400 | 401 | 403 | 404 | 429 | 500
            message: string
            error: any
        }) => any
    }
}