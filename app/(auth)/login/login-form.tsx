"use client"

import { Button } from "@/components/button"
import { TextField } from "@/components/form/text-field"
import { Metadata } from "next"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { LoginInputs, loginAction } from "./page"

export const metadata: Metadata = {
  title: "Login",
  description: "Login page",
}

export default function LoginForm({ action }: { action: typeof loginAction }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginInputs>()

  const router = useRouter()

  const onSubmit = handleSubmit(async (data: LoginInputs) => {
    const { ok, error } = await action(data)
    console.log({ ok, error })

    if (ok) {
      router.replace("/me")
    }
  })

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto mt-12 flex max-w-lg flex-col rounded-2xl border-neutral-800 bg-white px-8 py-12 text-slate-900 shadow-lg dark:border dark:bg-neutral-900 dark:text-slate-200 dark:shadow-none"
    >
      <h1 className="mb-6 self-center text-4xl font-bold">Welcome back 👋</h1>

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
        autoComplete="current-password"
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

      <Button
        disabled={!isValid}
        type="submit"
        className="mt-6 w-1/2 self-center disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Loading..." : "Login"}
      </Button>

      <Link
        href="/register"
        className="mt-8 self-center text-sm font-medium text-slate-600 underline"
      >
        register
      </Link>
    </form>
  )
}
