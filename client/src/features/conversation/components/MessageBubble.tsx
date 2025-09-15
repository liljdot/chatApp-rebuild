import { Avatar, AvatarImage } from "@/components/ui"
import type { MessageForConversation } from "../types"

interface Props {
    message: MessageForConversation
}

const MessageBubble: React.FC<Props> = ({ message }) => {
    return (
        <div className="chat chat-end flex flex-row-reverse">
            <Avatar className="chat-image size-10">
                <AvatarImage className="rounded-full" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </Avatar>

            <div className="chat-bubble text-white bg-sky-500">{message.body}</div>

            <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">{"12:34"}</div>
        </div>
    )
}

export default MessageBubble
