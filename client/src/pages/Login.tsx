import LoginForm from "@/features/auth/components/LoginForm"
import type { RootState } from "@/state/store"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const Login = () => {
    const { authUser } = useSelector((state: RootState) => state.auth)
    if (authUser) {
        return (
            <Navigate to={"/"} replace />
        )
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
                <div className="w-full p-6 rounded-lg shadow-md bg-gray-400/0 bg-clip-padding backdrop-filter backdrop-blur-lg">
                    <h1 className="text-3xl font-semibold text-center text-gray-300">
                        Login
                        <span className="text-blue-500"> ChatApp</span>
                    </h1>

                    <LoginForm />
                </div>
            </div>
        </>
    )
}

export default Login
