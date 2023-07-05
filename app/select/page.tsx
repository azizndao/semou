import { PrismaClient } from "@prisma/client"
import SelectField from "./select-field"

/**
 * In this page we fetch data from the database and pass it to the SelectField
 * component.
 * NOTE: You can't use a state management library like useState, Redux or MobX
 * here but you can import a component that uses them for example `SelectUser`.
 * @returns
 */
export default async function SelectDemo() {
  const prisma = new PrismaClient()

  const users = await prisma.user.findMany()

  return <SelectField users={users} />
}
