import type { User } from "@/features/auth/types"
import { useSendMessageMutation } from "@/services/api/conversationsApi"
import { useState, type SyntheticEvent } from "react"
import { BsSend } from "react-icons/bs"

interface Props {
    targetUserId: User["id"]
}

const MessageInput: React.FC<Props> = ({ targetUserId }) => {
    const [message, setMessage] = useState<string>("")

    const [mutate] = useSendMessageMutation()

    const handleSubmit: React.EventHandler<SyntheticEvent> = e => {
        e.preventDefault()

        if (!message.trim()) {
            return
        }

        mutate({ message, recipientId: targetUserId }).unwrap()
            .catch(err => console.log(err))
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
