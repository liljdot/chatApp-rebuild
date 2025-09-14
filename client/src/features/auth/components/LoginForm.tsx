import TextInput from "@/components/ui/TextInput"
import { useLoginMutation, type LoginError } from "@/services/api/authApi"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import z from "zod"

const LoginForm: React.FC = () => {
    const navigate = useNavigate()

    const loginSchema = z.object({
        username: z.string().min(1),
        password: z.string().min(1)
    })

    const form = useForm({
        resolver: zodResolver(loginSchema)
    })

    const [mutate] = useLoginMutation()

    const onSubmit = form.handleSubmit(data => {
        return mutate(data).unwrap()
            .then(() => navigate("/"))
            .catch((err: { status: number, data: LoginError }) => {
                console.log(err)
                form.setError("root", {
                    message: err.data.message
                })
            })
    })

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label className="label p-2">
                    <span className="text-base label-text">Username</span>
                </label>
                <TextInput
                    control={form.control}
                    type="text"
                    name="username"
                    placeholder="Enter username"
                    className="w-full input input-bordered h-10"
                />
                {form.formState.errors.username && <p className="text-red-500">{form.formState.errors.username.message}</p>}
            </div>

            <div>
                <label className="label p-2">
                    <span className="text-base label-text">Password</span>
                </label>
                <TextInput
                    control={form.control}
                    type="password"
                    name={"password"}
                    placeholder="Enter password"
                    className="w-full input input-bordered h-10"
                />
                {form.formState.errors.password && <p className="text-red-500">{form.formState.errors.password.message}</p>}
            </div>

            <Link
                to="/signup"
                className="text-sm hover:underline hover:text-blue-600 mt-4 inline-block">
                {"Don't have an account?"}
            </Link>

            <div>
                <button
                    type="submit"
                    className="btn btn-block btn-sm mt-2 bg-blue-600 border-none"
                    disabled={form.formState.isSubmitting}
                >
                    {
                        form.formState.isSubmitting
                            ? <span className="loading loading-spinner loading-xl"></span>
                            : "Login"
                    }
                </button>
            </div>
            {
                form.formState.errors.root && <p className="text-red-500">{form.formState.errors.root.message}</p>
            }
        </form>
    )
}

export default LoginForm;