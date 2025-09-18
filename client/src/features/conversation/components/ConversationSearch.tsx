import { IoSearchSharp } from "react-icons/io5"
import type { ConversationForList } from "../types"
import { useState, type EventHandler, type SyntheticEvent } from "react"

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
            return
        }

        setDisplayedConversations(
            conversations.filter(c => c.User[0].fullName.toLowerCase().includes(search.toLowerCase()))
        )
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