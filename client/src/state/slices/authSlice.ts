import { createSlice } from "@reduxjs/toolkit";

interface AuthUser {
    id: string
    fullName: string
    email: string
    profilePic: string
    gender: "male" | "female"
}

const initialState: {
    authUser: AuthUser | null
} = {
    authUser: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {}
})

export const { reducer: authSliceReducer, actions: authSliceActions } = authSlice

export default authSlice