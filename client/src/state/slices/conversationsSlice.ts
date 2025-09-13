import type { ConversationForList } from "@/features/conversation/types";
import { createSlice } from "@reduxjs/toolkit";

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
    reducers: {},
})

export const {
    reducer: conversationSliceReducer,
    actions: conversationSliceActions
} = conversationsSlice

export default conversationsSlice