import { getAuthSession, setAuthCookies } from "@/lib/jwt"
import prisma from "@/lib/prisma"
import bcrypt from "bcrypt"
import { Metadata } from "next"
import { redirect } from "next/navigation"
import RegisterForm from "./registration-form"

export const metadata: Metadata = {
  title: "Register",
  description: "Register page",
}

export default async function RegisterPage() {
  const authSession = await getAuthSession()

  if (authSession) {
    redirect("/me")
  }

  return <RegisterForm action={registerAction} />
}

export interface RegisterInputs {
  email: string
  password: string
  password_confirmation: string
}

export async function registerAction({ email, password }: RegisterInputs) {
  "use server"
  const hashedPassword = await bcrypt.hash(password, 10)

  const { id } = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name: null,
    },
    select: { id: true },
  })

  setAuthCookies({ id, email })

  redirect("/welcome")
}
