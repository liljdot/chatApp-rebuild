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
    status: number
    message: string
    data: {
        id: string
        username: string
        fullName: string
        gender: string
        profilePic: string
        createdAt: Date
        updatedAt: Date
    }
}

export interface SignupError {
    status: number
    message: string
    error: string
}

interface LoginRequestType {
    username: string
    password: string
}

interface LoginResponseType {
    status: number
    message: string
    data: {
        id: string
        username: string
        fullName: string
        gender: string
        profilePic: string
        createdAt: Date
        updatedAt: Date
    }
}

export interface LoginError {
    status: number
    message: string
    error: string
}

interface LogoutResponseType {
    status: number
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
                method: "POST",
                body: data
            })
        }),
        login: builder.mutation<LoginResponseType, LoginRequestType>({
            query: data => ({
                url: "login",
                method: "POST",
                body: data
            })
        }),
        logout: builder.mutation<LogoutResponseType, undefined>({
            query: () => ({
                url: "logout",
                method: "POST",
            })
        })
    })
})

export const {
    useGetMeQuery,
    useSignupMutation,
    useLoginMutation,
    useLogoutMutation
} = authApi