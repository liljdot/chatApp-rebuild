import type { ComponentProps } from "react";
import { useController, type Control, type FieldPath, type FieldValues } from "react-hook-form";

interface Props<T extends FieldValues> extends ComponentProps<"input"> {
    type?: "text" | "password"
    control: Control<T>
    name: FieldPath<T>
}

const TextInput = <T extends FieldValues>({
    type = "text",
    control,
    name,
    ...props
}: Props<T>) => {
    const form = useController({ control, name })

    return (
        <>
            <input
                name={name}
                type={type}
                onChange={form.field.onChange}
                onBlur={form.field.onBlur}
                value={form.field.value || ""}
                {...props}
            />
        </>
    )
}

export default TextInput