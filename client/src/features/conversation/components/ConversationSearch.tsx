import { IoSearchSharp } from "react-icons/io5"
import type { ConversationForList } from "../types"
import { useState, type EventHandler, type SyntheticEvent } from "react"
import toast from "react-hot-toast"

interface Props {
    conversations: ConversationForList[]
    setDisplayedConversations: React.Dispatch<React.SetStateAction<ConversationForList[]>>
}

const ConversationSearch: React.FC<Props> = ({
    conversations,
    setDisplayedConversations
}) => {
    const [search, setSearch] = useState("")

    const handleSubmit: EventHandler<SyntheticEvent> = e => {
        e.preventDefault()

        if (!search.trim()) {
            return setDisplayedConversations(conversations)
        }

        if (search.length < 3) {
            setDisplayedConversations(conversations)
            return toast.error("Search term must be at least 3 characters long")
        }

        const filteredConversations = conversations.filter(c => c.User[0].fullName.toLowerCase().includes(search.toLowerCase()))

        if (filteredConversations.length === 0) {
            return toast.error("No conversations found")
        }

        setDisplayedConversations(filteredConversations)
    }

    return (
        <>
            <form className="flex items-center gap-2">
                <input
                    type="text"
                    className="input input-bordered rounded-full"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />

                <button
                    type="submit"
                    className="btn btn-circle bg-sky-500 text-white"
                    onClick={handleSubmit}
                >
                    <IoSearchSharp className="size-6 outline-none" />
                </button>
            </form>
        </>
    )
}

export default ConversationSearch