import { useConversationFieldContext } from "@/context/ConversationFieldContext"
import LogoutButton from "@/features/auth/components/LogoutButton"
import ConversationSearch from "@/features/conversation/components/ConversationSearch"
import ConversationsList from "@/features/conversation/components/ConversationsList"
import { useGetConversationsQuery } from "@/services/api/conversationsApi"
import type { RootState } from "@/state/store"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"


const Sidebar: React.FC = () => {
    const { conversations } = useSelector((state: RootState) => state.conversations)
    const { isLoading, error } = useGetConversationsQuery(undefined)
    const [displayedConversations, setDisplayedConversations] = useState(conversations)
    const {conversationFieldOpen, setConversationFieldOpen} = useConversationFieldContext()

    useEffect(() => {
        setDisplayedConversations(conversations)
    }, [conversations])

    if (error) {
        console.log(error)
    }

    return (
        <div className={`border-r border-slate-500 p-4 flex flex-col w-screen md:w-auto ${conversationFieldOpen ? "max-w-0 px-0 overflow-y-hidden" : "max-w-screen"} md:p-4 md:max-w-100 transition-width duration-500 ease-in-out`}>
            <ConversationSearch
                conversations={conversations}
                setDisplayedConversations={setDisplayedConversations}
            />
            <div className="divider px-3"></div>
            {
                isLoading ?
                    <span className="loading loading-spinner loading-xl mx-auto"></span>
                    : <ConversationsList conversations={displayedConversations || []} />
            }
            <div className="mt-auto">
                <LogoutButton />
            </div>
        </div>
    )
}

export default Sidebar