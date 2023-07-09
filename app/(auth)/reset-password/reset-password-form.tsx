"use client"

import { Button } from "@/components/button"
import { TextField } from "@/components/form/text-field"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { ResetPasswordFields, resetPasswordAction } from "./page"

export function ResetPasswordForm({
  action,
}: {
  action: typeof resetPasswordAction
}) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isSubmitted, isValid, errors },
  } = useForm<ResetPasswordFields>()

  const router = useRouter()

  const onSubmit = handleSubmit(async (data) => {
    const response = await action(data)
    console.log(response)
    if (response.ok) {
      router.replace("/me")
    }
  })

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col max-w-lg w-full shadow-md py-12 rounded-xl px-8"
    >
      <h1 className="text-4xl font-bold self-center mb-8">Reset password</h1>

      <TextField
        label="Current password"
        type="password"
        autoComplete="current-password"
        error={errors.oldPassword}
        {...register("oldPassword", {
          required: {
            value: true,
            message: "Current password is required",
          },
        })}
      />

      <TextField
        label="New password"
        type="password"
        autoComplete="new-password"
        error={errors.newPassword}
        {...register("newPassword", {
          required: {
            value: true,
            message: "Password is required",
          },
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters long",
          },
        })}
      />

      <TextField
        label="Confirmation"
        type="password"
        autoComplete="new-password"
        error={errors.newPasswordConfirmation}
        {...register("newPasswordConfirmation", {
          validate: (value) => value === getValues("newPassword"),
          required: {
            value: true,
            message: "Password confirmation is required",
          },
        })}
      />

      <Button
        loading={isSubmitted}
        disabled={!isValid}
        type="submit"
        className="mt-8 w-1/2 self-center"
      >
        Submit
      </Button>
    </form>
  )
}
