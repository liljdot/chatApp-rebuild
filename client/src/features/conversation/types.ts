interface Conversation {
    id: string
    createdAt: Date
    updatedAt: Date
    participantIds: string[]
    messageIds: string[]
}

export type ConversationForList = Conversation