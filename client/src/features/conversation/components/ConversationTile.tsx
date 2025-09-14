import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";
import type { ConversationForList } from "../types";

interface Props {
    conversation: ConversationForList
}

const ConversationTile: React.FC<Props> = ({ conversation }) => {

    return (
        <>
            <div className="flex gap-2 items-center hover:bg-sky-500 rounded px-2 py-1 cursor-pointer">
                <Avatar className="size-12" online>
                    <AvatarImage src={conversation.User[0].profilePic} className="rounded-full" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div className="flex flex-col flex-1">
                    <div className="flex gap-3 justify-between">
                        <p className="font-bold text-gray-200">{conversation.User[0].fullName}</p>
                        <span className="text-xl">{conversation.Message[conversation.Message.length - 1].body}</span>
                    </div>
                </div>
            </div>

            <div className="divider my-0 py-0 h-1"></div>
        </>
    )
}

export default ConversationTile;