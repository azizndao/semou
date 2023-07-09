import { getAuthSession, setAuthCookies } from "@/lib/jwt"
import prisma from "@/lib/prisma"
import bcrypt from "bcrypt"
import { redirect } from "next/navigation"
import LoginForm from "./login-form"

export default async function LoginPage() {
  const authSession = await getAuthSession()

  if (authSession) {
    redirect("/me")
  }

  return <LoginForm action={loginAction} />
}

export interface LoginInputs {
  email: string
  password: string
}

export async function loginAction({ email, password }: LoginInputs) {
  "use server"
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, password: true },
    })

    console.log(user)

    if (!user) {
      return {
        ok: false,
        error: "No user found",
      }
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return {
        ok: false,
        error: "Invalid credentials",
      }
    }

    setAuthCookies(user)

    return {
      ok: true,
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      error: "No user found",
    }
  }
}
