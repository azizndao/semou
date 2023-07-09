"use client"

import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import { PropsWithChildren } from "react"
import { twMerge } from "tailwind-merge"

export const NavLink = ({
  href,
  children,
}: PropsWithChildren<{ href: string }>) => {
  const segment = useSelectedLayoutSegment()

  const active = segment === href.replace("/", "")

  return (
    <li role="menuitem">
      <Link
        href={href}
        className={twMerge(
          "hover:underline decoration-blue-500 text-sm",
          active && "underline decoration-4 font-medium"
        )}
      >
        {children}
      </Link>
    </li>
  )
}
