import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";
import type { ConversationForList } from "../types";
import { useSelector } from "react-redux";
import { useAppDispatch, type RootState } from "@/state/store";
import { cn } from "@/lib/utils";
import { setSelectedConversation } from "@/state/slices/conversationsSlice";
import { useSocketContext } from "@/context/SocketContext";
import { memo, useEffect, useState, type EventHandler, type SyntheticEvent } from "react";

interface Props {
    conversation: ConversationForList
    setConversationFieldOpen?: () => void
}

const ConversationTile: React.FC<Props> = ({ conversation, setConversationFieldOpen }) => {
    const { selectedConversationId } = useSelector((state: RootState) => state.conversations)
    const isSelected = selectedConversationId == conversation.id

    const [unreadCount, setUnreadCount] = useState<number>(0)

    const { onlineUserIds } = useSocketContext()
    const isOnline = conversation.User[0]
        ? onlineUserIds.includes(conversation.User[0].id)
        : false

    const dispatch = useAppDispatch()

    const handleClick: EventHandler<SyntheticEvent> = () => {
        dispatch(setSelectedConversation(conversation.id))
        setConversationFieldOpen?.()
    }

    useEffect(() => {
        let count = 0
        for (const message of conversation.Message) {
            if (message.isUnread) {
                count++
            } else {
                break
            }
        }

        setUnreadCount(count)
    }, [
        conversation.Message,
        setUnreadCount
    ])

    return (
        <>
            <div
                className={cn(
                    "flex gap-2 items-center hover:bg-sky-500 rounded px-2 py-1 cursor-pointer",
                    {
                        "bg-sky-500": isSelected
                    }
                )}
                onClick={handleClick}
            >
                <Avatar className="size-12" online={isOnline}>
                    <AvatarImage src={conversation.User[0] ? conversation.User[0].profilePic : ""} className="rounded-full" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div className="flex flex-col flex-1">
                    <div className="flex gap-3 justify-between">
                        <p className="font-bold text-gray-200">{conversation.User[0] ? conversation.User[0].fullName : "User"}</p>
                        {
                            unreadCount
                                ? <div className="badge bg-orange-500 size-5 rounded-full">{unreadCount}</div>
                                : <span className="text-xl">{conversation.Message[0].body}</span>
                        }
                    </div>
                </div>
            </div>

            <div className="divider my-0 py-0 h-1"></div>
        </>
    )
}

export default memo(ConversationTile);