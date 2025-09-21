import type { ConversationForList, MessageForConversation } from "@/features/conversation/types";
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
        },
        addNewConversationMessage: (state, action: PayloadAction<MessageForConversation>) => {
            let conversation: ConversationForList

            const conversationId = action.payload.conversationId
            const conversationIndex = state.conversations.findIndex(c => c.id == conversationId)

            if (conversationIndex != -1) {
                conversation = state.conversations[conversationIndex]
                conversation.Message.push(action.payload)

                state.conversations = [
                    conversation,
                    ...state.conversations.filter(c => c.id != conversation.id)
                ]
                return
            }

            conversation = {
                id: conversationId,
                createdAt: new Date(),
                updatedAt: new Date(),
                participantIds: [action.payload.senderId],
                messageIds: [action.payload.id],
                User: [],
                Message: [action.payload]
            }

            state.conversations = [
                conversation,
                ...state.conversations
            ]
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
        builder.addMatcher(conversationsApi.endpoints.sendMessage.matchPending, (state, action) => {
            const { originalArgs: { message, recipientId }, } = action.meta.arg
            const { requestId } = action.meta

            const conversationIndex = state.conversations.findIndex(c => c.User[0].id == recipientId)

            if (conversationIndex == -1) {
                return
            }

            const conversation = state.conversations[conversationIndex]

            const optimisticMessage = {
                id: `tempId-${requestId}`,
                senderId: conversation.participantIds.find(id => id != recipientId)!,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                conversationId: conversation.id,
                body: message,
                isOptimistic: true
            }
            conversation.Message.push(optimisticMessage)

            state.conversations = [
                conversation,
                ...state.conversations.filter(c => c.id != conversation.id)
            ]
        })
        builder.addMatcher(conversationsApi.endpoints.sendMessage.matchFulfilled, (state, action) => {
            const { requestId, arg: { originalArgs: { recipientId } } } = action.meta
            const sentMessage = action.payload.data

            const conversationIndex = state.conversations.findIndex(c => c.User[0].id == recipientId)

            if (conversationIndex == -1) {
                return
            }

            const conversation = state.conversations[conversationIndex]
            conversation.Message = conversation.Message.map(m => m.id == `tempId-${requestId}` ? sentMessage : m)

            state.conversations = [
                conversation,
                ...state.conversations.filter(c => c.id != conversation.id)
            ]
        })
        builder.addMatcher(conversationsApi.endpoints.sendMessage.matchRejected, (state, action) => {
            const { originalArgs: { recipientId }, } = action.meta.arg
            const { requestId } = action.meta

            const conversationIndex = state.conversations.findIndex(c => c.User[0].id == recipientId)

            if (conversationIndex == -1) {
                return
            }

            const conversation = state.conversations[conversationIndex]

            conversation.Message = conversation.Message.filter(m => m.id != `tempId-${requestId}`)

            state.conversations = [
                conversation,
                ...state.conversations.filter(c => c.id != conversation.id)
            ]
        })
    }
})

export const {
    reducer: conversationSliceReducer,
    actions: { setSelectedConversation, addNewConversationMessage }
} = conversationsSlice

export default conversationsSlice