import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui"
import type { ConversationForList } from "../types"
import MessageBubble from "./MessageBubble"
import MessageInput from "./MessageInput"
import NoConversationSelected from "./NoConversationSelected"
import { useSelector } from "react-redux"
import { useAppDispatch, type RootState } from "@/state/store"
import { useGetConversationMessagesQuery } from "@/services/api/conversationsApi"
import { skipToken } from "@reduxjs/toolkit/query"
import type { User } from "@/features/auth/types"
import { useSocketContext } from "@/context/SocketContext"
import { useConversationFieldContext } from "@/context/ConversationFieldContext"
import { cn } from "@/lib/utils"
import { ChevronLeft } from "lucide-react"
import type { EventHandler, SyntheticEvent } from "react"
import { setSelectedConversation } from "@/state/slices/conversationsSlice"

interface ConversationFieldProps {
    conversationId: ConversationForList["id"] | null
    userId?: number
}

interface ConversationFieldHeaderProps {
    targetUser: User
    targetUserIsOnline?: boolean
    setConversationFieldOpen?: (value: boolean) => void
}

interface MessagesContainerProps {
    isLoading: boolean
    messages: ConversationForList["Message"]
    targetUser: User
}

const ConversationField: React.FC<ConversationFieldProps> = ({
    conversationId,
    userId
}) => {
    const { conversations } = useSelector((state: RootState) => state.conversations)
    const selectedConversation = conversations.find(c => c.id == conversationId)

    const { conversationFieldOpen, setConversationFieldOpen } = useConversationFieldContext()

    const { onlineUserIds } = useSocketContext()

    const targetUserIsOnline = selectedConversation
        ? onlineUserIds.includes(selectedConversation.User[0].id)
        : false

    const { isLoading: getMessagesIsLoading, isFetching: getMessagesIsFetching } = useGetConversationMessagesQuery(conversationId || skipToken)

    return (
        <div className={cn(
            "md:min-w-[450px] flex flex-col transition-width duration-500 ease-in-out",
            {
                "max-w-screen w-75": conversationFieldOpen,
                "max-w-0 overflow-hidden": !conversationFieldOpen
            }
        )}>
            {
                !conversationId && !userId
                    ? <NoConversationSelected />
                    : (
                        <>
                            <ConversationFieldHeader
                                targetUser={selectedConversation!.User[0]}
                                targetUserIsOnline={targetUserIsOnline}
                                setConversationFieldOpen={setConversationFieldOpen}
                            />
                            <MessagesContainer
                                isLoading={getMessagesIsLoading || getMessagesIsFetching}
                                messages={selectedConversation!.Message}
                                targetUser={selectedConversation!.User[0]}
                            />
                            <MessageInput targetUserId={selectedConversation!.User[0].id} />
                        </>
                    )
            }
        </div>
    )
}

const ConversationFieldHeader: React.FC<ConversationFieldHeaderProps> = ({
    targetUser,
    targetUserIsOnline,
    setConversationFieldOpen
}) => {
    const dispatch = useAppDispatch()

    const handleGoBack: EventHandler<SyntheticEvent> = () => {
        setConversationFieldOpen?.(false)
        dispatch(setSelectedConversation(null))
    }

    return (
        <div className="flex flex-row bg-sky-500 px-4 py-2 mb-2">
            <button
                className="flex flex-row items-center md:hidden font-bold cursor-pointer"
                onClick={handleGoBack}
            >
                <ChevronLeft size={24} />
                Chats
            </button>
            <div className="flex flex-1 justify-center">
                <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage className="rounded-full" src={targetUser.profilePic}>

                        </AvatarImage>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <p className="text-sm font-semibold text-slate-200">{targetUser.fullName}</p>
                        {
                            targetUserIsOnline && <span className="text-xs font-medium text-slate-200">Online</span>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

const MessagesContainer: React.FC<MessagesContainerProps> = ({ messages, isLoading, targetUser }) => {

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
                    isLoading && <span className="loading loading-spinner loading-xl mx-auto"></span>
                }
            </div>
        </>
    )
}

export default ConversationField
