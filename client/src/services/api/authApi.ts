import type { User } from "@/features/auth/types"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface GetMeResponseType {
    status: number
    message: string
    data: User
}

interface SignupRequestType {
    username: string
    fullName: string
    password: string
    confirmPassword: string
    gender: string
}

interface SignupResponseType {
    id: string
    username: string
    fullName: string
    gender: string
    profilePic: string
    createdAt: Date
    updatedAt: Date
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
        }),
        signup: builder.mutation<SignupResponseType, SignupRequestType>({
            query: data => ({
                url: "signup",
                body: data
            })
        })
    })
})

export const {
    useGetMeQuery,
    useSignupMutation
} = authApi