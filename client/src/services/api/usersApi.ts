import { type User } from "@/features/auth/types";
import type { ConversationForList } from "@/features/conversation/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface GetConversationUserResponseType {
    status: number
    message: string
    data: User
}

interface GetAllUsersResponseType {
    status: number
    message: string
    data: User[]
}

export const usersApi = createApi({
    reducerPath: "api/usersApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "api/users",
    }),
    endpoints: builder => ({
        getConversationUser: builder.query<GetConversationUserResponseType, { id: User["id"], conversationId: ConversationForList["id"] }>({
            query: data => ({
                url: `/${data.id}`
            })
        }),
        getAllUsers: builder.query<GetAllUsersResponseType, undefined>({
            query: () => ({
                url: "/"
            })
        })
    })
})

export const {
    useGetConversationUserQuery,
    useGetAllUsersQuery
} = usersApi