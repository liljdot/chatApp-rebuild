import type { User } from "@/features/auth/types"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

const initialState: {
    selectedUserId: User["id"] | null
} = {
    selectedUserId: null
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setSelectedUserId: (state, action: PayloadAction<User["id"] | null>) => {
            state.selectedUserId = action.payload
        }
    }
})

export const { reducer: usersSliceReducer, actions: { setSelectedUserId } } = usersSlice
export default usersSlice