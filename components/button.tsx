import { twMerge } from "tailwind-merge"

type ButtonProps = JSX.IntrinsicElements["button"] & {
  loading?: boolean
}

export function Button({
  className,
  loading,
  children,
  ...attrs
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        "bg-neutral-900 text-white text-sm font-medium px-6 py-2.5 rounded-md only:hover:bg-neutral-900/90 dark:hover:bg-neutral-900/80 transition-colors inline-flex gap-4 items-center justify-center",
        className
      )}
      {...attrs}
    >
      {loading && <LoadingSpin />}
      {children}
    </button>
  )
}

export function OutlinedButton({
  className,
  loading,
  children,
  ...attrs
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        "border-2 border-blue-500 text-blue-500 text-sm font-medium px-6 py-2.5 rounded-md hover:border-blue-500/90 transition-colors inline-flex gap-4 items-center justify-center",
        className
      )}
      {...attrs}
    >
      {loading && <LoadingSpin />}
      {children}
    </button>
  )
}

function LoadingSpin() {
  return (
    <svg
      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  )
}
