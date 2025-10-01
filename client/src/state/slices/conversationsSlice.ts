import type { ConversationForList, MessageForConversation } from "@/features/conversation/types";
import { authApi } from "@/services/api/authApi";
import { conversationsApi } from "@/services/api/conversationsApi";
import { usersApi } from "@/services/api/usersApi";
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
                conversation.Message.unshift(action.payload)

                state.conversations = [
                    conversation,
                    ...state.conversations.filter(c => c.id != conversation.id)
                ]
                return
            }

            conversation = {
                id: conversationId,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                participantIds: [action.payload.senderId],
                messageIds: [action.payload.id],
                User: [],
                Message: [action.payload]
            }

            state.conversations = [
                conversation,
                ...state.conversations
            ]
        },
        setMessageRead: ((state, action: PayloadAction<{ id: MessageForConversation["id"], conversationId: ConversationForList["id"] }>) => {
            const { id, conversationId } = action.payload

            // const conversationIndex = state.conversations.findIndex(c => c.id == conversationId)

            // if (conversationIndex != -1) {
            //     const conversation = state.conversations[conversationIndex]

            //     conversation.Message = conversation.Message.map(m => m.id == id
            //         ? {
            //             ...m,
            //             isUnread: false
            //         }
            //         : m)

            //     state.conversations = state.conversations.map(c => c.id != conversationId ? c : conversation)
            // }

            state.conversations = state.conversations.map(c => c.id != conversationId
                ? c
                : {
                    ...c,
                    Message: c.Message.map(m => m.id != id
                        ? m
                        : {
                            ...m,
                            isUnread: false
                        }
                    )
                }
            )
        })
    },
    extraReducers: builder => {
        builder.addMatcher(usersApi.endpoints.getConversationUser.matchFulfilled, (state, action) => {
            const { arg: { originalArgs } } = action.meta
            const conversationIndex = state.conversations.findIndex(c => c.id == originalArgs.conversationId)

            const conversation = state.conversations[conversationIndex]
            conversation.User[0] = action.payload.data

            state.conversations = [
                ...state.conversations.map(c => c.id != conversation.id ? c : conversation)
            ]
        })
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
        builder.addMatcher(conversationsApi.endpoints.getConversationByUserId.matchFulfilled, (state, action) => {
            state.selectedConversationId = action.payload.data.id
        })

        builder.addMatcher(authApi.endpoints.signup.matchFulfilled, () => initialState)
        builder.addMatcher(authApi.endpoints.login.matchFulfilled, () => initialState)
        builder.addMatcher(authApi.endpoints.logout.matchFulfilled, () => initialState)
        builder.addMatcher(conversationsApi.endpoints.sendMessage.matchPending, (state, action) => {
            const { originalArgs: { message, targetUser, sender }, } = action.meta.arg
            const { requestId } = action.meta

            const conversationIndex = state.conversations.findIndex(c => c.User[0].id == targetUser.id)

            if (conversationIndex == -1) {
                const optimisticMessage = {
                    id: `tempId-${requestId}`,
                    senderId: sender.id,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    conversationId: `tempId-${requestId}`,
                    body: message,
                    isOptimistic: true
                }

                const conversation: ConversationForList = {
                    id: `tempId-${requestId}`,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    participantIds: [sender.id, targetUser.id],
                    User: [targetUser],
                    messageIds: [`tempId-${requestId}`],
                    Message: [optimisticMessage]
                }

                state.conversations = [
                    conversation,
                    ...state.conversations
                ]
                state.selectedConversationId = conversation.id

                return
            }

            const conversation = state.conversations[conversationIndex]

            const optimisticMessage = {
                id: `tempId-${requestId}`,
                senderId: conversation.participantIds.find(id => id != targetUser.id)!,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                conversationId: conversation.id,
                body: message,
                isOptimistic: true
            }
            conversation.Message.unshift(optimisticMessage)

            state.conversations = [
                conversation,
                ...state.conversations.filter(c => c.id != conversation.id)
            ]
        })
        builder.addMatcher(conversationsApi.endpoints.sendMessage.matchFulfilled, (state, action) => {
            const { requestId, arg: { originalArgs: { targetUser } } } = action.meta
            const sentMessage = action.payload.data

            const conversationIndex = state.conversations.findIndex(c => c.User[0].id == targetUser.id)

            if (conversationIndex == -1) {
                const conversation: ConversationForList = {
                    id: sentMessage.conversationId,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    participantIds: [sentMessage.senderId, targetUser.id],
                    User: [{
                        id: targetUser.id,
                        username: targetUser.username,
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString(),
                        fullName: targetUser.fullName,
                        gender: targetUser.gender,
                        profilePic: targetUser.profilePic
                    }],
                    messageIds: [sentMessage.id],
                    Message: [sentMessage]
                }
                state.conversations = [
                    conversation,
                    ...state.conversations
                ]
                return
            }

            const conversation = state.conversations[conversationIndex]
            conversation.Message = conversation.Message.map(m => m.id == `tempId-${requestId}` ? sentMessage : m)
            conversation.id = sentMessage.conversationId

            state.conversations = [
                conversation,
                ...state.conversations.filter(c => c.User[0].id != targetUser.id)
            ]
        })
        builder.addMatcher(conversationsApi.endpoints.sendMessage.matchRejected, (state, action) => {
            const { originalArgs: { targetUser }, } = action.meta.arg
            const { requestId } = action.meta

            const conversationIndex = state.conversations.findIndex(c => c.User[0].id == targetUser.id)

            if (conversationIndex == -1) {
                return
            }

            const conversation = state.conversations[conversationIndex]

            conversation.Message = conversation.Message.filter(m => m.id != `tempId-${requestId}`)

            state.conversations = [
                ...(conversation.Message.length
                    ? [conversation]
                    : []
                ),
                ...state.conversations.filter(c => c.id != conversation.id)
            ]
        })
    }
})

export const {
    reducer: conversationSliceReducer,
    actions: { setSelectedConversation, addNewConversationMessage, setMessageRead }
} = conversationsSlice

export default conversationsSlice