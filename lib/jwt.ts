import prisma from "@/lib/prisma"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

export async function setAuthCookies({
  id,
  email,
}: {
  email: string
  id: number
}) {
  const JWT_SECRET = process.env.JWT_SECRET as string

  const token = jwt.sign({ id, email }, JWT_SECRET, {
    expiresIn: "1d",
  })

  cookies().set(TOKEN_NAME, token, {
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 86400,
    path: "/",
  })
}

export async function getAuthSession() {
  const _cookies = cookies()
  const token = _cookies.get(TOKEN_NAME)

  if (!token) return null

  const JWT_SECRET = process.env.JWT_SECRET as string

  try {
    const { id } = jwt.verify(token.value, JWT_SECRET) as {
      id: number
      email: string
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, email: true, name: true },
    })

    return user
  } catch (error) {
    console.log(error)
    return null
  }
}

export const TOKEN_NAME = "token"
