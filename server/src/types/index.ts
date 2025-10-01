export interface CleanUser {
    username: string;
    fullName: string;
    gender: "male" | "female";
    id: string;
    profilePic: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Message {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    body: string;
    senderId: string;
    conversationId: string;
}

export interface Conversation {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    participantIds: string[];
    messageIds: string[];
}

export interface ConversationWithMessages extends Conversation {
    Message: Message[]
}