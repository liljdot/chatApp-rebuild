import type { ComponentProps } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

interface Props<T extends FieldValues> extends ComponentProps<"form"> {
    form: UseFormReturn<T>
}

const Form = <T extends FieldValues>({
    form,
    onSubmit,
    children,
    ...props
}: Props<T>) => {
    return (
        <>
            <form
                onSubmit={onSubmit}
                {...props}
            >
                {children}
                {
                    form.formState.errors.root && <p className="text-red-500">{form.formState.errors.root.message}</p>
                }
            </form>
        </>
    )
}

export default Form