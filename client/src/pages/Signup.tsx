import { Link } from "react-router-dom"

const Signup = () => {
    return (
        <>
            <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
                <div className="w-full p-6 rounded-lg shadow-md bg-gray-400/0 bg-clip-padding backdrop-filter backdrop-blur-lg">
                    <h1 className="text-3xl font-semibold text-center text-gray-300">
                        Sign Up
                        <span className="text-blue-500"> ChatApp</span>
                    </h1>

                    <form>
                        <div>
                            <label className="label p-2">
                                <span className="text-base label-text">Full Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                className="w-full input input-bordered h-10"
                            />
                        </div>

                        <div>
                            <label className="label p-2">
                                <span className="text-base label-text">Username</span>
                            </label>
                            <input
                                type="text"
                                placeholder="johndoe"
                                className="w-full input input-bordered h-10"
                            />
                        </div>

                        <div>
                            <label className="label p-2">
                                <span className="text-base label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Enter password"
                                className="w-full input input-bordered h-10"
                            />
                        </div>

                        <div>
                            <label className="label p-2">
                                <span className="text-base label-text">Confirm Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Confirm password"
                                className="w-full input input-bordered h-10"
                            />
                        </div>

                        {/* TODO: add gender select checkbox */}

                        <Link
                            to="/login"
                            className="text-sm hover:underline hover:text-blue-600 mt-4 inline-block">
                            {"Already have an account?"}
                        </Link>

                        <div>
                            <button
                                type="submit"
                                className="btn btn-block btn-sm mt-2 bg-blue-600">
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup
