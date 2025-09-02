import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

import { cn } from "@/lib/utils"

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn(
        "flex gap-1",
        className,
      )}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <div className="label gap-2">
      <RadioGroupPrimitive.Item
        data-slot="radio-group-item"
        className={cn(
          "form-control cursor-pointer",
          className
        )}
        {...props}
      >

        <RadioGroupPrimitive.Indicator
          data-slot="radio-group-indicator"
          className="relative flex items-center justify-center"
        >
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
      <span className="label-text">
        {children}
      </span>
    </div>
  )
}

export { RadioGroup, RadioGroupItem }
