import { HTMLProps, forwardRef } from "react"
import { FieldError } from "react-hook-form"
import { twMerge } from "tailwind-merge"

export interface TextFieldProps
  extends Omit<HTMLProps<HTMLInputElement>, "ref"> {
  label: string
  helpterText?: string
  error?: FieldError
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>((props, ref) => {
  const { label, type, helpterText, error, className, ...attrs } = props
  return (
    <label className="group flex flex-col gap-2 py-4">
      <p className="px-1">{label}</p>
      <input
        className={twMerge(
          "rounded-md border bg-slate-50 px-4 py-1.5 outline-none focus:ring-2 focus:ring-blue-500 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200",
          error && "ring-2 ring-red-400",
          className,
        )}
        type={type}
        {...attrs}
        ref={ref}
      />
      <HelpterText error={error} helpterText={helpterText} />
    </label>
  )
})

TextField.displayName = "TextField"

export { TextField }

function HelpterText({
  error,
  helpterText,
}: {
  error?: FieldError
  helpterText?: string
}) {
  if (error) {
    return <small className="px-1 text-sm text-red-600">{error.message}</small>
  }

  if (helpterText) {
    return <small className="px-1 text-sm text-slate-500">{helpterText}</small>
  }

  return null
}
