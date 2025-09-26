import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";
import type { User } from "@/features/auth/types";

interface Props {
    users: User[]
    isLoading: boolean
}

const UsersList: React.FC<Props> = ({
    users,
    isLoading
}) => {
    return (
        <div className="flex flex-row space-x-1.5 max-w-full overflow-x-scroll">
            {/* <div className="flex flex-col justify-start items-center w-16 gap-1">
                <Avatar>
                    <AvatarImage className="rounded-full" src={""}>

                    </AvatarImage>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="text-sm font-semibold text-slate-200">John Doe</p>
            </div> */}

            {
                users.map(user => (
                    <div className="flex flex-col w-16 text-center justify-start items-center gap-1 shrink-0" key={user.id}>
                        <Avatar>
                            <AvatarImage className="rounded-full" src={user.profilePic}>

                            </AvatarImage>
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className="text-sm font-semibold text-slate-200">{user.fullName}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default UsersList;