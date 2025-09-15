import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui"
import type { ConversationForList } from "../types"
import MessageBubble from "./MessageBubble"
import MessageInput from "./MessageInput"
import NoConversationSelected from "./NoConversationSelected"
import { useSelector } from "react-redux"
import type { RootState } from "@/state/store"
import { useGetConversationMessagesQuery } from "@/services/api/conversationsApi"
import { skipToken } from "@reduxjs/toolkit/query"

interface ConversationFieldProps {
    conversationFieldOpen: boolean
    setConversationFieldOpen: (value: boolean) => void
    conversationId: ConversationForList["id"] | null
    userId?: number
}

interface ConversationFieldHeaderProps { }

interface MessagesContainerProps {
    isLoading: boolean
    messages: ConversationForList["Message"]
}

const ConversationField: React.FC<ConversationFieldProps> = ({
    conversationFieldOpen,
    setConversationFieldOpen,
    conversationId,
    userId
}) => {
    const { conversations } = useSelector((state: RootState) => state.conversations)
    const selectedConversation = conversations.find(c => c.id == conversationId)

    const { isLoading: getMessagesIsLoading, isFetching: getMessagesIsFetching } = useGetConversationMessagesQuery(conversationId || skipToken)

    return (
        <div className={`md:min-w-[450px] flex flex-col transition-width duration-500 ease-in-out ${conversationFieldOpen ? "max-w-screen w-75" : "max-w-0 overflow-hidden"}`}>
            {
                !conversationId && !userId
                    ? <NoConversationSelected />
                    : (
                        <>
                            <ConversationFieldHeader />
                            <MessagesContainer
                                isLoading={getMessagesIsLoading || getMessagesIsFetching}
                                messages={selectedConversation!.Message}
                            />
                            <MessageInput />
                        </>
                    )
            }
        </div>
    )
}

const ConversationFieldHeader: React.FC<ConversationFieldHeaderProps> = () => {

    return (
        <>
            <div className="flex justify-center bg-sky-500 px-4 py-2 mb-2">
                <div className="flex items-center gap-2">
                    <Avatar online>
                        <AvatarImage className="rounded-full" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp">

                        </AvatarImage>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-200">John Doe</span>
                    </div>
                </div>
            </div>
        </>
    )
}

const MessagesContainer: React.FC<MessagesContainerProps> = ({ messages, isLoading }) => {

    return (
        <>
            <div className="flex-1 px-4 overflow-auto">
                {
                    isLoading && <span className="loading loading-spinner loading-xl mx-auto"></span>
                }
                {
                    messages.map(message => <MessageBubble message={message} />)
                }
            </div>
        </>
    )
}

export default ConversationField
