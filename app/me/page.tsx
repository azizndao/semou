import { getAuthSession } from "@/lib/jwt"

export default async function ProfilePage() {
  const authSession = await getAuthSession()

  return (
    <div>
      <pre>
        <code>{JSON.stringify(authSession, null, 4)}</code>
      </pre>
    </div>
  )
}
