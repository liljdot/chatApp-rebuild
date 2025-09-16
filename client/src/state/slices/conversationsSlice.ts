import type { ConversationForList } from "@/features/conversation/types";
import { authApi } from "@/services/api/authApi";
import { conversationsApi } from "@/services/api/conversationsApi";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialState: {
    conversations: ConversationForList[],
    selectedConversationId: ConversationForList["id"] | null
} = {
    conversations: [],
    selectedConversationId: null
}

const conversationsSlice = createSlice({
    name: "conversations",
    initialState,
    reducers: {
        setSelectedConversation: (state, action: PayloadAction<ConversationForList["id"] | null>) => {
            state.selectedConversationId = action.payload
        }
    },
    extraReducers: builder => {
        builder.addMatcher(conversationsApi.endpoints.getConversations.matchFulfilled, (state, action) => {
            state.conversations = action.payload.data
        })
        builder.addMatcher(conversationsApi.endpoints.getConversationMessages.matchFulfilled, (state, action) => {
            state.conversations = state.conversations.map(c => c.id != action.meta.arg.originalArgs
                ? c
                : {
                    ...c,
                    Message: action.payload.data
                }
            )
        })

        builder.addMatcher(authApi.endpoints.signup.matchFulfilled, () => initialState)
        builder.addMatcher(authApi.endpoints.login.matchFulfilled, () => initialState)
        builder.addMatcher(authApi.endpoints.logout.matchFulfilled, () => initialState)
    }
})

export const {
    reducer: conversationSliceReducer,
    actions: { setSelectedConversation }
} = conversationsSlice

export default conversationsSlice