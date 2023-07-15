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
          "text-sm decoration-blue-500 hover:underline",
          active && "font-medium underline decoration-4",
        )}
      >
        {children}
      </Link>
    </li>
  )
}
