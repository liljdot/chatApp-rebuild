import type { ConversationForList } from "@/features/conversation/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface GetConversationsResponseType {
    status: number
    message: string
    data: ConversationForList[]
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
        })
    })
})

export const {
    useGetConversationsQuery
} = conversationsApi