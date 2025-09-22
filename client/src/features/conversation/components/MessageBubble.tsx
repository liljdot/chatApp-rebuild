import { Avatar, AvatarImage } from "@/components/ui"
import type { MessageForConversation } from "../types"
import type { User } from "@/features/auth/types"
import { useSelector } from "react-redux"
import { useAppDispatch, type RootState } from "@/state/store"
import { getTime } from "@/lib/utils"
import { useEffect } from "react"
import { setMessageRead } from "@/state/slices/conversationsSlice"

interface Props {
    message: MessageForConversation
    targetUser: User
}

const MessageBubble: React.FC<Props> = ({ message, targetUser }) => {
    const { authUser } = useSelector((state: RootState) => state.auth)
    const dispatch = useAppDispatch()

    const isOwnMessage = message.senderId === authUser?.id
    const { isUnread, isOptimistic } = message

    useEffect(() => {
        if (isUnread && !isOwnMessage) {
            const timeout = setTimeout(() => {
                dispatch(setMessageRead({ id: message.id, conversationId: message.conversationId }))
            }, 3000)

            return () => clearTimeout(timeout)
        }
    }, [
        dispatch,
        isUnread,
        message,
        isOwnMessage
    ])

    return (
        <div className={`chat flex ${isOwnMessage ? "chat-end  flex-row-reverse" : "chat-start flex-row"} ${isUnread && "shake"}`}>
            <Avatar className="chat-image size-10">
                <AvatarImage className="rounded-full" src={`${isOwnMessage ? authUser.profilePic : targetUser.profilePic}`} />
            </Avatar>

            <div className={`chat-bubble text-white ${!isOwnMessage ? "bg-gray-600" : isOptimistic ? "bg-purple-500" : "bg-sky-500"}`}>{message.body}</div>

            <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">{getTime(message.createdAt)}</div>
        </div>
    )
}

export default MessageBubble
