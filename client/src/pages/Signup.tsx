import z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import GenderCheckbox from "@/components/ui/GenderCheckbox"
import { Link } from "react-router-dom"

const Signup = () => {
    const signupSchema = z.object({
        fullName: z.string(),
        username: z.string(),
        password: z.string().min(8),
        confirmPassword: z.string(),
        gender: z.string().refine(gender => (gender === "male" || gender === "female"), {
            message: "Gender must be male or female"
        })
    })
        .refine(data => data.password === data.confirmPassword, {
            message: "Passwords do not match",
            path: ["confirmPassword"]
        })

    const form = useForm({
        resolver: zodResolver(signupSchema)
    })

    const onSubmit = form.handleSubmit(data => console.log(data))

    return (
        <>
            <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
                <div className="w-full p-6 rounded-lg shadow-md bg-gray-400/0 bg-clip-padding backdrop-filter backdrop-blur-lg">
                    <h1 className="text-3xl font-semibold text-center text-gray-300">
                        Sign Up
                        <span className="text-blue-500"> ChatApp</span>
                    </h1>

                    <form onSubmit={onSubmit}>
                        <div>
                            <label className="label p-2">
                                <span className="text-base label-text">Full Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                className="w-full input input-bordered h-10"
                                {...form.register("fullName")}
                            />
                            {
                                form.formState.errors.fullName && <p className="text-red">{form.formState.errors.fullName.message}</p>
                            }
                        </div>

                        <div>
                            <label className="label p-2">
                                <span className="text-base label-text">Username</span>
                            </label>
                            <input
                                type="text"
                                placeholder="johndoe"
                                className="w-full input input-bordered h-10"
                                {...form.register("username")}
                            />
                            {
                                form.formState.errors.username && <p className="text-red">{form.formState.errors.username.message}</p>
                            }
                        </div>

                        <div>
                            <label className="label p-2">
                                <span className="text-base label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Enter password"
                                className="w-full input input-bordered h-10"
                                {...form.register("password")}
                            />
                            {
                                form.formState.errors.password && <p className="text-red">{form.formState.errors.password.message}</p>
                            }
                        </div>

                        <div>
                            <label className="label p-2">
                                <span className="text-base label-text">Confirm Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Confirm password"
                                className="w-full input input-bordered h-10"
                                {...form.register("confirmPassword")}
                            />
                            {
                                form.formState.errors.confirmPassword && <p className="text-red">{form.formState.errors.confirmPassword.message}</p>
                            }
                        </div>

                        <div className="mt-4">
                            <GenderCheckbox />
                            {
                                form.formState.errors.gender && <p className="text-red">{form.formState.errors.gender.message}</p>
                            }
                        </div>
                        <Link
                            to="/login"
                            className="text-sm hover:underline hover:text-blue-600 mt-4 inline-block">
                            {"Already have an account?"}
                        </Link>

                        <div>
                            <button
                                type="submit"
                                className="btn btn-block btn-sm mt-2 bg-blue-600 border-none">
                                Sign Up
                            </button>
                        </div>
                        {
                            form.formState.errors.root && <p className="text-red">{form.formState.errors.root.message}</p>
                        }
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup
