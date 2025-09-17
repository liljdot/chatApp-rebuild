import type { User } from "../auth/types"

interface Conversation {
    id: string
    createdAt: Date
    updatedAt: Date
    participantIds: User["id"][]
    messageIds: Message["id"][]
    User: User[]
    Message: Message[]
}

interface Message {
    id: string
    createdAt: string
    updatedAt: string
    body: string
    senderId: User["id"]
    conversationId: Conversation["id"]
    isOptimistic?: boolean
}

export type ConversationForList = Conversation
export type MessageForConversation = Message