import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";
import type { ConversationForList } from "./types";

interface Props {
    conversation?: ConversationForList
}

const ConversationTile: React.FC<Props> = ({ conversation }) => {

    return (
        <>
            <div className="flex gap-2 items-center hover:bg-sky-500 rounded px-2 py-1 cursor-pointer">
                <Avatar className="size-12" online>
                    <AvatarImage src="https://img.daisyui.com/images/profile/demo/yellingwoman@192.webp" className="rounded-full" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div className="flex flex-col flex-1">
                    <div className="flex gap-3 justify-between">
                        <p className="font-bold text-gray-200">John Doe</p>
                        <span className="text-xl">😍</span>
                    </div>
                </div>
            </div>

            <div className="divider my-0 py-0 h-1"></div>
        </>
    )
}

export default ConversationTile;