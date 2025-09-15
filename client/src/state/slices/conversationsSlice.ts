import type { ConversationForList } from "@/features/conversation/types";
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
    }
})

export const {
    reducer: conversationSliceReducer,
    actions: { setSelectedConversation }
} = conversationsSlice

export default conversationsSlice