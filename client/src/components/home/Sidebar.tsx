import LogoutButton from "@/features/auth/components/LogoutButton"
import ConversationSearch from "@/features/conversation/components/ConversationSearch"
import ConversationsList from "@/features/conversation/components/ConversationsList"
import { useGetConversationsQuery } from "@/services/api/conversationsApi"

interface Props {
    conversationFieldOpen: boolean
    setConversationFieldOpen: (value: boolean) => void
}

const Sidebar: React.FC<Props> = ({
    conversationFieldOpen,
    setConversationFieldOpen
}) => {
    const { data, isLoading, error } = useGetConversationsQuery(undefined)

    if (error) {
        console.log(error)
    }

    return (
        <div className={`border-r border-slate-500 p-4 flex flex-col ${conversationFieldOpen ? "max-w-0 px-0 overflow-y-hidden" : "max-w-screen"} md:p-4 md:max-w-100 transition-width duration-500 ease-in-out`}>
            <ConversationSearch />
            <div className="divider px-3"></div>
            {
                isLoading ?
                    <span className="loading loading-spinner loading-xl mx-auto"></span>
                    : <ConversationsList conversations={data?.data || []} />
            }
            <div className="mt-auto">
                <button onClick={() => setConversationFieldOpen(!conversationFieldOpen)}>toggle</button>
                <LogoutButton />
            </div>
        </div>
    )
}

export default Sidebar