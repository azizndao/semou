import { getAuthSession } from "@/lib/jwt"
import prisma from "@/lib/prisma"
import { compare, hash } from "bcrypt"
import { redirect } from "next/navigation"
import { ResetPasswordForm } from "./reset-password-form"

export default async function ResetPassword() {
  const authSession = await getAuthSession()

  if (authSession) {
    redirect("/login")
  }

  return <ResetPasswordForm action={resetPasswordAction} />
}

export interface ResetPasswordFields {
  oldPassword: string
  newPassword: string
  newPasswordConfirmation: string
}

export async function resetPasswordAction({
  oldPassword,
  newPassword,
}: ResetPasswordFields) {
  const user = await getAuthSession()

  if (!user) {
    return {
      error: "No user found",
    }
  }

  const dbUser = await prisma.user.findUnique({
    where: { email: user.email },
    select: { password: true },
  })

  if (!user) {
    return {
      error: "No user found",
    }
  }

  if (!(await compare(oldPassword, dbUser!.password))) {
    return {
      error: "Password not match",
    }
  }

  await prisma.user.update({
    data: {
      password: await hash(newPassword, 10),
    },
    where: {
      id: user.id,
    },
  })

  redirect("/me")
}
