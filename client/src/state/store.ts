import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { authSliceReducer } from "./slices/authSlice"
import { authApi } from "@/services/api/authApi"
import { conversationSliceReducer } from "./slices/conversationsSlice"

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        conversations: conversationSliceReducer,
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export default store