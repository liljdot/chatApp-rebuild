import type { ConversationForList } from "@/features/conversation/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const conversationsApi = createApi({
    reducerPath: "api/conversationsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/messages/",
    }),
    endpoints: builder => ({
        getConversations: builder.query<ConversationForList[], undefined>({
            query: () => ({
                url: "conversations"
            })
        })
    })
})

export const {
    useGetConversationsQuery
} = conversationsApi