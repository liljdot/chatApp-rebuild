import SignupForm from "@/features/auth/components/SignupForm"

const Signup = () => {

    return (
        <>
            <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
                <div className="w-full p-6 rounded-lg shadow-md bg-gray-400/0 bg-clip-padding backdrop-filter backdrop-blur-lg">
                    <h1 className="text-3xl font-semibold text-center text-gray-300">
                        Sign Up
                        <span className="text-blue-500"> ChatApp</span>
                    </h1>

                    <SignupForm />
                </div>
            </div>
        </>
    )
}

export default Signup
