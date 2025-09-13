import { authApi } from "@/services/api/authApi";
import { createSlice } from "@reduxjs/toolkit";

interface AuthUser {
    id: string
    fullName: string
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
    reducers: {},
    extraReducers: builder => {
        builder.addMatcher(authApi.endpoints.getMe.matchFulfilled, (state, action) => {
            state.authUser = action.payload.data
        })
        builder.addMatcher(authApi.endpoints.getMe.matchRejected, state => {
            state.authUser = null
        })

        builder.addMatcher(authApi.endpoints.logout.matchPending, state => {
            state.authUser = null
        })
    }
})

export const { reducer: authSliceReducer, actions: authSliceActions } = authSlice

export default authSlice