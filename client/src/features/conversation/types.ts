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
    createdAt: Date
    updatedAt: Date
    body: string
    senderId: User["id"]
    conversationId: Conversation["id"]
}

export type ConversationForList = Conversation
export type MessageForConversation = Message