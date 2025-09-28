import type { User } from "@/features/auth/types"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

const initialState: {
    selectedUser: User | null
} = {
    selectedUser: null
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setSelectedUser: (state, action: PayloadAction<User | null>) => {
            state.selectedUser = action.payload
        }
    }
})

export const { reducer: usersSliceReducer, actions: { setSelectedUser } } = usersSlice
export default usersSlice