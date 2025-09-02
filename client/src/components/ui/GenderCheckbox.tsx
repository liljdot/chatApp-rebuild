import { RadioGroup, RadioGroupItem } from "./radio-group"

const GenderCheckbox = () => {
    return (
        <RadioGroup name="gender" className="gap-2">
            <RadioGroupItem value="male" className="checkbox border-slate-900">
                Male
            </RadioGroupItem>

            <RadioGroupItem value="femalie" className="checkbox border-slate-900">
                Female
            </RadioGroupItem>
        </RadioGroup>
    )
}

export default GenderCheckbox
