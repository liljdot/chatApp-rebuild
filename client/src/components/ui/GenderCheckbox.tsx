import { useController, type Control, type FieldPath, type FieldValues } from "react-hook-form"
import { RadioGroup, RadioGroupItem } from "./radio-group"

interface Props<T extends FieldValues> {
    name: FieldPath<T>
    control: Control<T>
}

const GenderCheckbox = <T extends FieldValues>({control, name}: Props<T>) => {
    const form = useController({control, name})

    return (
        <RadioGroup name="gender" className="gap-2" onChange={form.field.onChange} onBlur={form.field.onBlur} defaultValue={form.field.value}>
            <RadioGroupItem value="male" className="checkbox border-slate-900">
                Male
            </RadioGroupItem>

            <RadioGroupItem value="female" className="checkbox border-slate-900">
                Female
            </RadioGroupItem>
        </RadioGroup>
    )
}

export default GenderCheckbox
