import { useGetMeQuery } from "@/services/api/authApi"
import type { RootState } from "@/state/store"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const RequireAuth: React.FC = () => {
    const { isLoading, error } = useGetMeQuery(undefined)
    const { authUser } = useSelector((state: RootState) => state.auth)

    if (isLoading) {
        return <span className="loading loading-spinner loading-xl"></span>
    }

    if (error) {
        console.log(error)

        return <Navigate to={"/login"}/>
    }

    return (
        <div>
            <Outlet />
        </div>
    )
}

export default RequireAuth
