import { useLogoutMutation } from "@/services/api/authApi"
import { BiLogOut } from "react-icons/bi"

const LogoutButton = () => {
    const [logout] = useLogoutMutation()

    return (
        <div className="mt-auto">
            <BiLogOut className="size-6 text-white cursor-pointer" onClick={() => logout(undefined)} />
        </div>
    )
}

export default LogoutButton
