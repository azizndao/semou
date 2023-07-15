import { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="grid h-[calc(100vh-6rem)] w-full place-content-center p-4">
      <main className="w-full max-w-lg md:w-[512px]">{children}</main>
    </div>
  )
}
