import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { authSliceReducer } from "./slices/authSlice"
import { authApi } from "@/services/api/authApi"
import { conversationSliceReducer } from "./slices/conversationsSlice"
import { conversationsApi } from "@/services/api/conversationsApi"
import listenerMiddleware from "@/services/middleware/listenerMiddleware"
import { usersApi } from "@/services/api/usersApi"
import { usersSliceReducer } from "./slices/usersSlice"

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        conversations: conversationSliceReducer,
        users: usersSliceReducer,
        [authApi.reducerPath]: authApi.reducer,
        [conversationsApi.reducerPath]: conversationsApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .prepend(listenerMiddleware.middleware)
            .concat(authApi.middleware, conversationsApi.middleware, usersApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export default store