import { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-[calc(100vh-6rem)] w-full grid place-content-center p-4">
      <main className="max-w-lg w-full md:w-[512px]">{children}</main>
    </div>
  )
}
