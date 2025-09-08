import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { authSliceReducer } from "./slices/authSlice"
import { authApi } from "@/services/api/authApi"

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export default store