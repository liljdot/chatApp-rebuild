import ConversationTile from "./ConversationTile";
import type { ConversationForList } from "../types";

interface Props {
    conversations: ConversationForList[]
}

const ConversationsList: React.FC<Props> = ({ conversations }) => {

    return (
        <>
            <div className="py-2 flex flex-col overflow-auto">
                <ConversationTile />
                <ConversationTile />
                <ConversationTile />
                <ConversationTile />
                <ConversationTile />
            </div>
        </>
    )
}

export default ConversationsList;