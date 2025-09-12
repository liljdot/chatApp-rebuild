import type { User } from "@/features/auth/types"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface GetMeResponseType {
    status: number
    message: string
    data: User
}

export const authApi = createApi({
    reducerPath: "api/authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/auth/"
    }),
    endpoints: builder => ({
        getMe: builder.query<GetMeResponseType, undefined>({
            query: () => ({
                url: "me"
            })
        })
    })
})

export const { useGetMeQuery } = authApi