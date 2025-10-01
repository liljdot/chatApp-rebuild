import type { User } from "@/features/auth/types"
import type { ConversationForList } from "../types"
import MessageBubble from "./MessageBubble"
import { TiMessages } from "react-icons/ti"

interface Props {
    isLoading: boolean
    messages: ConversationForList["Message"]
    targetUser: User
}

const MessagesContainer: React.FC<Props> = ({ messages, isLoading, targetUser }) => {

    return (
        <>
            <div className="flex-1 flex flex-col-reverse px-4 overflow-auto">
                {
                    messages.map(message => (
                        <MessageBubble
                            message={message}
                            targetUser={targetUser}
                            key={message.id}
                        />
                    ))
                }
                {
                    isLoading
                        ? <span className="loading loading-spinner loading-xl mx-auto"></span>
                        : !messages.length && (
                            <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-1 flex-col items-center justify-center gap-2">
                                <h1>Send a message to start a conversation with {targetUser.fullName}</h1>
                                <TiMessages className="text-3xl md:text-6xl text-center" />
                            </div>
                        )
                }
            </div>
        </>
    )
}

export default MessagesContainer