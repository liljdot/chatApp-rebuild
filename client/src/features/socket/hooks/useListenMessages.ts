import { useSocketContext } from "@/context/SocketContext"
import type { MessageForConversation } from "@/features/conversation/types"
import { addNewConversationMessage } from "@/state/slices/conversationsSlice"
import { useAppDispatch } from "@/state/store"
import { useEffect } from "react"
import notificationSound from "@/assets/sounds/notification.mp3"

const useListenMessages = () => {
    const { socket } = useSocketContext()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (socket) {
            socket.on("newMessage", (message: MessageForConversation) => {
                dispatch(addNewConversationMessage({ ...message, isUnread: true }))
                const sound = new Audio(notificationSound)
                sound.play()
            })

            return () => socket.off("newMessage")
        }

        return () => { }
    }, [
        socket,
        dispatch
    ])
}

export default useListenMessages