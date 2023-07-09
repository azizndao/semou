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
      where: { email: email },
      select: { id: true, email: true, password: true },
    })

    if (!user) {
      return {
        error: "No user found",
      }
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return {
        error: "Invalid credentials",
      }
    }

    setAuthCookies(user)

    return redirect("/me")
  } catch (error) {
    console.log(error)
    return {
      error: "No user found",
    }
  }
}
