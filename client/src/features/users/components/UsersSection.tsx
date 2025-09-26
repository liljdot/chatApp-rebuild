import { useGetAllUsersQuery } from "@/services/api/usersApi"
import UsersList from "./UsersList"

const UsersSection: React.FC = () => {
    const { data, isLoading, error } = useGetAllUsersQuery(undefined)
    if (error) {
        console.log(error)
    }

    return (
        <div className="w-full space-y-2">
            <p className="text-sm">
                Start a new chat
            </p>
            <UsersList users={data?.data || []} isLoading={isLoading} />
        </div>
    )
}

export default UsersSection