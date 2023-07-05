"use client"

import { User } from "@prisma/client"
import { useRef } from "react"

/**
 * This component is rendered on the client. That allows us to use React.
 * Refer to the docs for more info
 * @returns
 */
export default function SelectField({ users }: { users: User[] }) {
  // For performance reasons, we use useRef to access the DOM element
  // instead of using React state.
  const selectRef = useRef<HTMLSelectElement>(null)

  return (
    <section>
      <h1>Select</h1>
      <select ref={selectRef}>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </section>
  )
}
