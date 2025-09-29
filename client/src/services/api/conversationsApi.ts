import type { User } from "@/features/auth/types";
import type { ConversationForList, MessageForConversation } from "@/features/conversation/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface GetConversationsResponseType {
    status: number
    message: string
    data: ConversationForList[]
}

interface GetConversationByUserIdResponseType {
    status: number
    message: string
    data: ConversationForList
}

interface GetConversationMessagesResponseType {
    status: number
    message: string
    data: MessageForConversation[]
}

interface SendMessageRequestType {
    recipientId: User["id"]
    message: string
}

interface SendMessageResponseType {
    status: number
    message: string
    data: MessageForConversation
}

export const conversationsApi = createApi({
    reducerPath: "api/conversationsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/messages/",
    }),
    endpoints: builder => ({
        getConversations: builder.query<GetConversationsResponseType, undefined>({
            query: () => ({
                url: "conversations"
            })
        }),
        getConversationByUserId: builder.query<GetConversationByUserIdResponseType, User["id"]>({
            query: userId => ({
                url: `conversations/byUserId/${userId}`
            })
        }),
        getConversationMessages: builder.query<GetConversationMessagesResponseType, ConversationForList["id"]>({
            query: conversationId => ({
                url: `${conversationId}`
            })
        }),
        sendMessage: builder.mutation<SendMessageResponseType, SendMessageRequestType>({
            query: data => ({
                url: `send/${data.recipientId}`,
                method: "POST",
                body: {
                    message: data.message
                }
            })
        })
    })
})

export const {
    useGetConversationsQuery,
    useGetConversationByUserIdQuery,
    useGetConversationMessagesQuery,
    useSendMessageMutation
} = conversationsApi