import { TiMessages } from "react-icons/ti"

const NoConversationSelected: React.FC = () => {
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

export default NoConversationSelected
