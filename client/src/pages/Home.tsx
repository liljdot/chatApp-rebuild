import Sidebar from "@/components/home/Sidebar"
import ConversationField from "@/features/conversation/components/ConversationField"
import useListenMessages from "@/features/socket/hooks/useListenMessages"
import type { RootState } from "@/state/store"
import { useSelector } from "react-redux"

const Home = () => {
  const { selectedConversationId } = useSelector((state: RootState) => state.conversations)
  const { selectedUser } = useSelector((state: RootState) => state.users)
  useListenMessages()

  return (
    <div className="flex h-screen w-screen md:w-full md:h-[550px] rounded-lg overflow-hidden bg-gray-400/0 bg-clip-padding backdrop-filter backdrop-blur-lg">
      <Sidebar />
      <ConversationField
        conversationId={selectedConversationId}
        targetUser={selectedUser}
      />
    </div>
  )
}

export default Home
