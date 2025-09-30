import type { User } from "@/features/auth/types"
import { useSendMessageMutation } from "@/services/api/conversationsApi"
import { setSelectedConversation } from "@/state/slices/conversationsSlice"
import { useAppDispatch, type RootState } from "@/state/store"
import { useState, type SyntheticEvent } from "react"
import toast from "react-hot-toast"
import { BsSend } from "react-icons/bs"
import { useSelector } from "react-redux"

interface Props {
    targetUser: User
}

const MessageInput: React.FC<Props> = ({ targetUser }) => {
    const [message, setMessage] = useState<string>("")

    const { selectedConversationId } = useSelector((state: RootState) => state.conversations)
    const dispatch = useAppDispatch()
    const [mutate] = useSendMessageMutation()

    const handleSubmit: React.EventHandler<SyntheticEvent> = e => {
        e.preventDefault()

        if (!message.trim()) {
            return
        }

        mutate({ message, targetUser }).unwrap()
            .then(res => {
                if (!selectedConversationId) {
                    dispatch(setSelectedConversation(res.data.conversationId))
                }
            })
            .catch((err: { status: number, data: { status: number, message: string, error: string } }) => toast.error(err.data.error))
        setMessage("")
    }

    return (
        <form className="px-4 my-3">
            <div className="w-full relative">
                <input
                    type="text"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Type a message"
                    className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
                />
                <button
                    type="submit"
                    className="absolute inset-y-0 end-0 flex items-center pe-3"
                    onClick={handleSubmit}
                >
                    <BsSend />
                </button>
            </div>
        </form>
    )
}

export default MessageInput
