import { TOKEN_NAME } from "@/lib/jwt"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function logoutAction() {
  "use server"
  cookies().delete(TOKEN_NAME)
  redirect("/login")
}
