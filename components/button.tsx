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
        "inline-flex items-center justify-center gap-4 rounded-md bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white transition-colors only:hover:bg-neutral-900/90 dark:hover:bg-neutral-900/80",
        className,
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
        "inline-flex items-center justify-center gap-4 rounded-md border-2 border-blue-500 px-6 py-2.5 text-sm font-medium text-blue-500 transition-colors hover:border-blue-500/90",
        className,
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
      className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
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
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  )
}
