import type { ConversationForList } from "./types";

interface Props {
    conversations: ConversationForList[]
}

const ConversationsList: React.FC<Props> = ({conversations}) => {

    return (
        <>
            <div>
                Conversations List
            </div>
        </>
    )
}

export default ConversationsList;