import type { RootState } from "@/state/store"
import { TiMessages } from "react-icons/ti"
import { useSelector } from "react-redux"

const NoConversationSelected: React.FC = () => {
    const { authUser } = useSelector((state: RootState) => state.auth)

    return (
        <>
            <div className="flex items-center justify-center size-full">
                <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
                    <p>Welcome {authUser?.fullName}</p>
                    <p>Select a chat to start messaging</p>
                    <TiMessages className="text-3xl md:text-6xl text-center" />
                </div>
            </div>
        </>
    )
}

export default NoConversationSelected
