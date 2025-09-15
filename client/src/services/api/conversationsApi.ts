import type { ConversationForList, MessageForConversation } from "@/features/conversation/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface GetConversationsResponseType {
    status: number
    message: string
    data: ConversationForList[]
}

interface GetConversationMessagesResponseType {
    status: number
    message: string
    data: MessageForConversation[]
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
        getConversationMessages: builder.query<GetConversationMessagesResponseType, ConversationForList["id"]>({
            query: conversationId => ({
                url: `${conversationId}`
            })
        })
    })
})

export const {
    useGetConversationsQuery,
    useGetConversationMessagesQuery
} = conversationsApi