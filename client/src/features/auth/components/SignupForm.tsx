import Form from "@/components/ui/Form"
import GenderCheckbox from "@/components/ui/GenderCheckbox"
import TextInput from "@/components/ui/TextInput"
import { useSignupMutation, type SignupError } from "@/services/api/authApi"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import z from "zod"

const SignupForm: React.FC = () => {
    const navigate = useNavigate()

    const signupSchema = z.object({
        fullName: z.string().min(1),
        username: z.string().min(1),
        password: z.string().min(8),
        confirmPassword: z.string(),
        gender: z.string().refine(gender => (gender === "male" || gender === "female"), {
            message: "Gender must be male or female"
        })
    })
        .refine(data => data.password === data.confirmPassword, {
            error: "Passwords do not match",
            path: ["confirmPassword"]
        })

    const form = useForm({
        resolver: zodResolver(signupSchema)
    })

    const [mutation] = useSignupMutation()

    const onSubmit = form.handleSubmit(data => {
        return mutation(data).unwrap()
            .then(() => navigate("/"))
            .catch((err: { status: number, data: SignupError }) => {
                console.log(err)
                form.setError("root", {
                    message: err.data.message
                })
            })
    })

    return (
        <>
            <Form
                form={form}
                onSubmit={onSubmit}
            >
                <div>
                    <label className="label p-2">
                        <span className="text-base label-text">Full Name</span>
                    </label>
                    <TextInput
                        control={form.control}
                        name="fullName"
                        type="text"
                        placeholder="John Doe"
                        className="w-full input input-bordered h-10"
                    />
                    {
                        form.formState.errors.fullName && <p className="text-red">{form.formState.errors.fullName.message}</p>
                    }
                </div>

                <div>
                    <label className="label p-2">
                        <span className="text-base label-text">Username</span>
                    </label>
                    <TextInput
                        control={form.control}
                        name="username"
                        type="text"
                        placeholder="johndoe"
                        className="w-full input input-bordered h-10"
                    />
                    {
                        form.formState.errors.username && <p className="text-red">{form.formState.errors.username.message}</p>
                    }
                </div>

                <div>
                    <label className="label p-2">
                        <span className="text-base label-text">Password</span>
                    </label>
                    <TextInput
                        control={form.control}
                        name="password"
                        type="password"
                        placeholder="Enter password"
                        className="w-full input input-bordered h-10"
                    />
                    {
                        form.formState.errors.password && <p className="text-red">{form.formState.errors.password.message}</p>
                    }
                </div>

                <div>
                    <label className="label p-2">
                        <span className="text-base label-text">Confirm Password</span>
                    </label>
                    <TextInput
                        control={form.control}
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm password"
                        className="w-full input input-bordered h-10"
                    />
                    {
                        form.formState.errors.confirmPassword && <p className="text-red">{form.formState.errors.confirmPassword.message}</p>
                    }
                </div>

                <div className="mt-4">
                    <GenderCheckbox
                        name="gender"
                        control={form.control}
                    />
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
                        className="btn btn-block btn-sm mt-2 bg-blue-600 border-none"
                        disabled={form.formState.isSubmitting}
                    >
                        {
                            form.formState.isSubmitting
                                ? <span className="loading loading-spinner loading-xl"></span>
                                : "Sign Up"
                        }
                    </button>
                </div>
            </Form>
        </>
    )
}

export default SignupForm;