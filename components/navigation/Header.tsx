import { logoutAction } from "@/app/(auth)/logout-action"
import { getAuthSession } from "@/lib/jwt"
import Link from "next/link"
import { NavLink } from "./NavLink"

export default async function Header() {
  const authSession = await getAuthSession()

  return (
    <header className="h-16 w-full border-b sticky dark:border-b-neutral-800">
      <nav className="container mx-auto flex items-center gap-6">
        <Link href="/" className="font-extrabold text-3xl">
          Hello
        </Link>
        <span className="grow"></span>
        <ul
          role="menubar"
          className="h-16 flex gap-4 items-center font-medium px-4"
        >
          <NavLink href="/">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
          {authSession && <NavLink href="/me">Profile</NavLink>}
        </ul>
        <ul className="flex gap-4 items-center">
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
      className="bg-neutral-900 text-neutral-200 dark:bg-white hover:bg-neutral-900/90 dark:hover:bg-white/90 dark:text-slate-700 text-sm font-medium py-2 px-4 rounded transition-colors"
    >
      Sign in
    </Link>
  )
}

function SignUpButton() {
  return (
    <Link
      href="/register"
      className="hover:bg-red-500 hover:text-white border-red-500 border hover:border-red-500 text-red-500  text-sm font-medium py-2 px-4 rounded transition-colors"
    >
      Sign up
    </Link>
  )
}

function SignOutButton() {
  return (
    <form action={logoutAction}>
      <button className="hover:bg-red-500 hover:text-white border-red-500 border hover:border-red-500 text-red-500  text-sm font-medium py-2 px-4 rounded transition-colors">
        Logout
      </button>
    </form>
  )
}
