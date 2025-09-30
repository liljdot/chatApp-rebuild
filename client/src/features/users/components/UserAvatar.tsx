import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui"
import { useConversationFieldContext } from "@/context/ConversationFieldContext"
import { useSocketContext } from "@/context/SocketContext"
import type { User } from "@/features/auth/types"
import { setSelectedConversation } from "@/state/slices/conversationsSlice"
import { setSelectedUser } from "@/state/slices/usersSlice"
import { useAppDispatch } from "@/state/store"
import type { EventHandler, SyntheticEvent } from "react"

interface Props {
    user: User
}

const UserAvatar: React.FC<Props> = ({ user }) => {
    const dispatch = useAppDispatch()

    const { setConversationFieldOpen } = useConversationFieldContext()

    const { onlineUserIds } = useSocketContext()
    const userIsOnline = onlineUserIds.includes(user.id)

    const handleClick: EventHandler<SyntheticEvent> = () => {
        dispatch(setSelectedUser(user))
        dispatch(setSelectedConversation(null))
        setConversationFieldOpen(true)
    }

    return (
        <div
            className="flex flex-col w-16 text-center justify-start items-center gap-1 shrink-0 hover:bg-gray-600/50 cursor-pointer"
            key={user.id}
            onClick={handleClick}
        >
            <Avatar online={userIsOnline}>
                <AvatarImage className="rounded-full" src={user.profilePic}>

                </AvatarImage>
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="text-sm font-semibold text-slate-200">{user.fullName}</p>
        </div>
    )
}

export default UserAvatar
