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
      className="max-w-lg mx-auto bg-white px-8 py-12 mt-12 shadow-lg rounded-2xl flex flex-col"
    >
      <h1 className="text-4xl font-bold self-center mb-6">Registration page</h1>

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
        className="self-center w-1/2 mt-6 disabled:opacity-70"
      >
        {isSubmitting ? "Loading..." : "Register"}
      </Button>

      <Link href="/login" className="text-sm self-center mt-12">
        Login
      </Link>
    </form>
  )
}
