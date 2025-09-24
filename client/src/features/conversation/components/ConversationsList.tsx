import ConversationTile from "./ConversationTile";
import type { ConversationForList } from "../types";
import { useConversationFieldContext } from "@/context/ConversationFieldContext";
import { useCallback } from "react";

interface Props {
    conversations: ConversationForList[]
}

const ConversationsList: React.FC<Props> = ({ conversations }) => {
    const { setConversationFieldOpen } = useConversationFieldContext()
    const handleSetConversationFieldOpen = useCallback(() => setConversationFieldOpen(true), [setConversationFieldOpen])

    return (
        <>
            <div className="py-2 flex flex-col overflow-auto">
                {
                    conversations.map(c => (
                        <ConversationTile
                            conversation={c}
                            key={c.id}
                            setConversationFieldOpen={handleSetConversationFieldOpen}
                        />
                    ))
                }
            </div>
        </>
    )
}

export default ConversationsList;