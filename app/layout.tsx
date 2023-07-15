import Header from "@/components/navigation/Header"
import { Metadata } from "next"
import { Inter } from "next/font/google"
import { twMerge } from "tailwind-merge"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Oxygen",
    "Ubuntu",
    "Cantarell",
    "Open Sans",
    "Helvetica Neue",
    "sans-serif",
  ],
})

export const metadata: Metadata = {
  title: "Hello",
  description: "Hello world",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={twMerge(
          "dark:text-slate-100; bg-slate-50 text-slate-700 dark:bg-neutral-900",
          inter.className,
        )}
      >
        <Header />
        <main className="container mx-auto">{children}</main>
      </body>
    </html>
  )
}
