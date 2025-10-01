import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui"
import type { ConversationForList } from "../types"
import MessageInput from "./MessageInput"
import NoConversationSelected from "./NoConversationSelected"
import { useSelector } from "react-redux"
import { useAppDispatch, type RootState } from "@/state/store"
import { useGetConversationByUserIdQuery, useGetConversationMessagesQuery } from "@/services/api/conversationsApi"
import { skipToken } from "@reduxjs/toolkit/query"
import type { User } from "@/features/auth/types"
import { useSocketContext } from "@/context/SocketContext"
import { useConversationFieldContext } from "@/context/ConversationFieldContext"
import { cn } from "@/lib/utils"
import { ChevronLeft } from "lucide-react"
import type { EventHandler, SyntheticEvent } from "react"
import { setSelectedConversation } from "@/state/slices/conversationsSlice"
import { setSelectedUser } from "@/state/slices/usersSlice"
import MessagesContainer from "./MessagesContainer"

interface ConversationFieldProps {
    conversationId: ConversationForList["id"] | null
    targetUser: User | null
}

interface ConversationFieldHeaderProps {
    targetUser: User
    targetUserIsOnline?: boolean
    setConversationFieldOpen?: (value: boolean) => void
}

const ConversationField: React.FC<ConversationFieldProps> = ({
    conversationId,
    targetUser
}) => {
    const { conversations } = useSelector((state: RootState) => state.conversations)
    const selectedConversation = conversations.find(c => c.id == conversationId)

    const { conversationFieldOpen, setConversationFieldOpen } = useConversationFieldContext()

    const { onlineUserIds } = useSocketContext()

    const targetUserIsOnline = selectedConversation
        ? onlineUserIds.includes(selectedConversation.User[0].id)
        : targetUser
            ? onlineUserIds.includes(targetUser.id)
            : false

    const { isLoading: getMessagesIsLoading, isFetching: getMessagesIsFetching } = useGetConversationMessagesQuery(conversationId || skipToken)
    const { isLoading: getConversationByUserIdIsLoading, isFetching: getConversationByUserIdIsFetching } = useGetConversationByUserIdQuery(conversationId ? skipToken : !targetUser ? skipToken : targetUser.id, { refetchOnMountOrArgChange: true })

    return (
        <div className={cn(
            "md:min-w-[450px] transition-width duration-500 ease-in-out",
            {
                "max-w-screen w-screen md:w-[450px]": conversationFieldOpen,
                "max-w-0 overflow-hidden": !conversationFieldOpen
            }
        )}>
            <div className="flex flex-col h-full w-screen md:w-full">
                {
                    !conversationId && !targetUser
                        ? <NoConversationSelected />
                        : (
                            <>
                                <ConversationFieldHeader
                                    targetUser={selectedConversation?.User[0] || targetUser!}
                                    targetUserIsOnline={targetUserIsOnline}
                                    setConversationFieldOpen={setConversationFieldOpen}
                                />
                                <MessagesContainer
                                    isLoading={getMessagesIsLoading || getMessagesIsFetching || getConversationByUserIdIsLoading || getConversationByUserIdIsFetching}
                                    messages={selectedConversation?.Message || []}
                                    targetUser={selectedConversation?.User[0] || targetUser!}
                                />
                                <MessageInput targetUser={selectedConversation?.User[0] || targetUser!} />
                            </>
                        )
                }
            </div>
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
        dispatch(setSelectedUser(null))
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

export default ConversationField
