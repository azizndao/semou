import { PrismaClient } from "@prisma/client"

/**
 * This method is called serer action. It is called when the user submits
 * the form. The code inside this method is executed only on the server.
 * Read more about server actions here: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions
 * @param formData the user registration form
 * @returns
 */
async function addUserAction(formData: FormData) {
  "use server"
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const passwordConfirm = formData.get("passwordConfirm")

  if (password !== passwordConfirm) {
    return
  }

  const prisma = new PrismaClient()

  await prisma.user.create({
    data: {
      name: name,
      email: email,
      // For demo purpose I don't hash the password. You should hash it.
      password: password,
    },
  })
}

export default function AddUser() {
  return (
    <div>
      <form action={addUserAction}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <label htmlFor="passwordConfirm">Confirm Password</label>
        <button>Register</button>
      </form>
    </div>
  )
}
