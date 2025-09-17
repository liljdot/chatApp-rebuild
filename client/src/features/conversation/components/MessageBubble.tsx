import { Avatar, AvatarImage } from "@/components/ui"
import type { MessageForConversation } from "../types"
import type { User } from "@/features/auth/types"
import { useSelector } from "react-redux"
import type { RootState } from "@/state/store"
import { getTime } from "@/lib/utils"

interface Props {
    message: MessageForConversation
    targetUser: User
}

const MessageBubble: React.FC<Props> = ({ message, targetUser }) => {
    const { authUser } = useSelector((state: RootState) => state.auth)

    const isOwnMessage = message.senderId === authUser?.id

    return (
        <div className={`chat flex ${isOwnMessage ? "chat-end  flex-row-reverse" : "chat-start flex-row"}`}>
            <Avatar className="chat-image size-10">
                <AvatarImage className="rounded-full" src={`${isOwnMessage ? authUser.profilePic : targetUser.profilePic}`} />
            </Avatar>

            <div className={`chat-bubble text-white ${message.isOptimistic ? "bg-purple-500" : "bg-sky-500"}`}>{message.body}</div>

            <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">{getTime(message.createdAt)}</div>
        </div>
    )
}

export default MessageBubble
