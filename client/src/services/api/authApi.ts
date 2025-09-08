import type { User } from "@/features/auth/types"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface GetMeResponseType {
    status: number
    message: string
    authUser: User
}

const authApi = createApi({
    reducerPath: "api/authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/api/"
    }),
    endpoints: builder => ({
        getMe: builder.query<GetMeResponseType, undefined>({
            query: () => ({
                url: "auth/me"
            })
        })
    })
})

export const { useGetMeQuery } = authApi