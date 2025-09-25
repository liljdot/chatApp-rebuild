import { baseURL } from "@/services/api/host"
import type { RootState } from "@/state/store"
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react"
import { useSelector } from "react-redux"
import { io, Socket } from "socket.io-client"

interface SocketContext {
    socket: Socket | null
    onlineUserIds: string[]
}

interface SocketContextProviderProps {
    children: ReactNode
}

const socketContext = createContext<SocketContext | undefined>(undefined)

const useSocketContext: () => SocketContext = () => {
    const context = useContext(socketContext)

    if (!context) {
        throw new Error("useSocketContext must be used within a SocketContextProvider")
    }

    return context
}

const SocketContextProvider: React.FC<SocketContextProviderProps> = ({ children }) => {
    const { authUser } = useSelector((state: RootState) => state.auth)

    const [onlineUserIds, setOnlineUserIds] = useState<string[]>([])

    const socketRef = useRef<Socket | null>(null)

    useEffect(() => {
        if (authUser) {
            console.log(baseURL)
            const socket = io(import.meta.env.MODE == "development" ? __SOCKET_URL__ : "/", {// TODO: change to dynamic url based on environment
                query: {
                    userId: authUser.id
                }
            })

            socketRef.current = socket

            socket.on("getOnlineUsers", (userIds: string[]) => {
                setOnlineUserIds(userIds)
            })

            return () => {
                socket.close()
                socketRef.current = null
            }
        }

        if (socketRef.current) {
            socketRef.current.close()
            socketRef.current = null
        }
    }, [authUser])

    return (
        <socketContext.Provider value={{ socket: socketRef.current, onlineUserIds }}>
            {children}
        </socketContext.Provider>
    )
}

export { useSocketContext }
export default SocketContextProvider