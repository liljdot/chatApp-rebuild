import LogoutButton from "@/features/auth/components/LogoutButton"
import ConversationSearch from "@/features/conversation/components/ConversationSearch"
import ConversationsList from "@/features/conversation/components/ConversationsList"

const Sidebar = () => {
    const conversationFieldOpen = true

    return (
        <div className={`border-r border-slate-500 p-4 flex flex-col ${conversationFieldOpen ? "max-w-0 px-0 overflow-y-hidden" : "max-w-screen"} md:p-4 md:max-w-100 transition-width duration-500 ease-in-out`}>
            <ConversationSearch />
            <ConversationsList conversations={[]} />

            <LogoutButton />
        </div>
    )
}

export default Sidebar