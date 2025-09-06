import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui"
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
            <div className="flex justify-center bg-sky-500 px-4 py-2 mb-2">
                <div className="flex items-center gap-2">
                    <Avatar online>
                        <AvatarImage src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp">

                        </AvatarImage>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-200">John Doe</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ConversationField
