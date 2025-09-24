import { createContext, useContext, useState, type ReactNode } from "react";

interface ConversationFieldContextType {
    conversationFieldOpen: boolean
    setConversationFieldOpen: (value: boolean) => void
}

const conversationFieldContext = createContext<ConversationFieldContextType | undefined>(undefined)

export const useConversationFieldContext = () => {
    const context = useContext(conversationFieldContext)

    if (!context) {
        throw new Error("useConversationFieldContext must be used within a ConversationFieldContextProvider")
    }

    return context
}

const ConversationFieldContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [conversationFieldOpen, setConversationFieldOpen] = useState<boolean>(false)

    return (
        <conversationFieldContext.Provider value={{ conversationFieldOpen, setConversationFieldOpen }}>
            {children}
        </conversationFieldContext.Provider>
    )
}

export default ConversationFieldContextProvider