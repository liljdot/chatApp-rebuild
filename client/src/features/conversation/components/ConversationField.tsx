import type { ConversationForList } from "../types"
import { TiMessages } from "react-icons/ti"

interface ConversationFieldProps {
    conversationFieldOpen: boolean
    setConversationFieldOpen: (value: boolean) => void
    conversationId: ConversationForList["id"]
}

interface ConversationFieldHeaderProps { }

const ConversationField: React.FC<ConversationFieldProps> = ({
    conversationFieldOpen,
    setConversationFieldOpen,
    conversationId
}) => {
    return (
        <div className={`md:min-w-[450px] flex flex-col transition-width duration-500 ease-in-out ${conversationFieldOpen ? "max-w-screen w-75" : "max-w-0 overflow-hidden"}`}>
            <ConversationFieldHeader />
        </div>
    )
}

const ConversationFieldHeader: React.FC<ConversationFieldHeaderProps> = () => {

    return (
        <>
            <div className="flex items-center justify-center size-full">
                <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
                    <p>Welcome John Doe</p>
                    <p>Select a chat to start messaging</p>
                    <TiMessages className="text-3xl md:text-6xl text-center" />
                </div>
            </div>
        </>
    )
}

export default ConversationField
