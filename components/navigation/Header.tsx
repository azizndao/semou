import { logoutAction } from "@/app/(auth)/logout-action"
import { getAuthSession } from "@/lib/jwt"
import Link from "next/link"
import { NavLink } from "./NavLink"

export default async function Header() {
  const authSession = await getAuthSession()

  return (
    <header className="sticky h-16 w-full border-b dark:border-b-neutral-800">
      <nav className="container mx-auto flex items-center gap-6">
        <Link href="/" className="text-3xl font-extrabold">
          Hello
        </Link>
        <span className="grow"></span>
        <ul
          role="menubar"
          className="flex h-16 items-center gap-4 px-4 font-medium"
        >
          <NavLink href="/">About</NavLink>
          <NavLink href="/upload">Upload</NavLink>
          <NavLink href="/contact">Contact</NavLink>
          {authSession && <NavLink href="/me">Profile</NavLink>}
        </ul>
        <ul className="flex items-center gap-4">
          {authSession ? (
            <SignOutButton />
          ) : (
            <>
              {" "}
              <SignInButton />
              <SignUpButton />
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}

function SignInButton() {
  return (
    <Link
      href="/login"
      className="rounded bg-neutral-900 px-4 py-2 text-sm font-medium text-neutral-200 transition-colors hover:bg-neutral-900/90 dark:bg-white dark:text-slate-700 dark:hover:bg-white/90"
    >
      Sign in
    </Link>
  )
}

function SignUpButton() {
  return (
    <Link
      href="/register"
      className="rounded border border-red-500 px-4 py-2 text-sm  font-medium text-red-500 transition-colors hover:border-red-500 hover:bg-red-500 hover:text-white"
    >
      Sign up
    </Link>
  )
}

function SignOutButton() {
  return (
    <form action={logoutAction}>
      <button className="rounded border border-red-500 px-4 py-2 text-sm  font-medium text-red-500 transition-colors hover:border-red-500 hover:bg-red-500 hover:text-white">
        Logout
      </button>
    </form>
  )
}
