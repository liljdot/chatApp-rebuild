import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { authSliceReducer } from "./slices/authSlice"
import { authApi } from "@/services/api/authApi"
import { conversationSliceReducer } from "./slices/conversationsSlice"
import { conversationsApi } from "@/services/api/conversationsApi"

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        conversations: conversationSliceReducer,
        [authApi.reducerPath]: authApi.reducer,
        [conversationsApi.reducerPath]: conversationsApi.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware, conversationsApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export default store