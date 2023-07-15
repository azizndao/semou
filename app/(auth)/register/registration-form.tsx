"use client"

import { Button } from "@/components/button"
import { TextField } from "@/components/form/text-field"
import { Metadata } from "next"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { RegisterInputs, registerAction } from "./page"

export const metadata: Metadata = {
  title: "Register",
  description: "Register page",
}

export default function RegisterForm({
  action,
}: {
  action: typeof registerAction
}) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting, isValid },
  } = useForm<RegisterInputs>()

  const router = useRouter()

  const onSubmit = handleSubmit(async (data: RegisterInputs) => {
    const { ok } = await action(data)
    if (ok) {
      router.replace("/me")
    }
  })

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto mt-12 flex max-w-lg flex-col rounded-2xl bg-white px-8 py-12 shadow-lg"
    >
      <h1 className="mb-6 self-center text-4xl font-bold">Registration page</h1>

      <TextField
        type="email"
        id="email"
        label="Email"
        error={errors.email}
        {...register("email", {
          required: {
            value: true,
            message: "Email is required",
          },
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Entered value does not match email format",
          },
        })}
      />

      <TextField
        type="password"
        id="password"
        label="Password"
        autoComplete="new-password"
        error={errors.password}
        helpterText="Password must have at least 8 characters"
        {...register("password", {
          required: {
            value: true,
            message: "Password is required",
          },
          minLength: {
            value: 8,
            message: "Password must have at least 8 characters",
          },
        })}
      />

      <TextField
        type="password"
        id="password_confirmation"
        autoComplete="new-password"
        label="Password confirmation"
        error={errors.password_confirmation}
        {...register("password_confirmation", {
          required: {
            value: true,
            message: "Password is required",
          },
          validate: (value) => {
            if (value === getValues("password")) return true
            return "The password do not match"
          },
        })}
      />

      <Button
        loading={isSubmitting}
        disabled={!isValid}
        type="submit"
        className="mt-6 w-1/2 self-center disabled:opacity-70"
      >
        {isSubmitting ? "Loading..." : "Register"}
      </Button>

      <Link href="/login" className="mt-12 self-center text-sm">
        Login
      </Link>
    </form>
  )
}
