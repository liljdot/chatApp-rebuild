import { type User } from "@/features/auth/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
        getAllUsers: builder.query<GetAllUsersResponseType, undefined>({
            query: () => ({
                url: "/"
            })
        })
    })
})

export const { useGetAllUsersQuery } = usersApi