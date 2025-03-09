"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { FormWizard } from "@/components/form-inputs";
import { Button } from "@/components/ui/button";
import { InputTypes, routes } from "@/lib";
import { usePostApiV1AuthSetPasswordMutation } from "@/lib/redux/api/openapi.generated";
import { ErrorResponse, isErrorResponse } from "@/lib/utils";

import { ResetPasswordFormValues, ResetPasswordValidator } from "./types";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("key");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: ResetPasswordValidator,
  });

  const [setPassword, { isLoading }] = usePostApiV1AuthSetPasswordMutation();

  const onSubmit = async (values: ResetPasswordFormValues) => {
    if (!token) {
      toast.error("Invalid reset token. Please try again");
      return;
    }

    try {
      await setPassword({
        setPasswordRequest: {
          password: values.password,
          confirmPassword: values.confirmPassword,
          token,
        },
      }).unwrap();

      toast.success(
        "Password reset successfully! You can now login with your new password.",
      );
      router.push(routes.signin());
    } catch (error) {
      toast.error(
        isErrorResponse(error as ErrorResponse)?.description ||
          "An error occurred",
      );
    }
  };

  if (!token) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="w-full max-w-md space-y-4 text-center">
          <h1 className="text-2xl font-bold">Invalid Reset Link</h1>
          <p className="text-muted-foreground">
            The password reset link is invalid or has expired. Please request a
            new reset link.
          </p>
          <Button asChild>
            <Link href="/forgot-password">Request New Reset Link</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Reset Your Password</h1>
          <p className="text-muted-foreground">Enter your new password below</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormWizard
            config={[
              {
                autoFocus: true,
                register: register("password"),
                label: "Password",
                required: true,
                placeholder: "Enter New Password",
                errors,
                type: InputTypes.PASSWORD,
                suffix: "Mail",
              },
              {
                register: register("confirmPassword"),
                label: "Confirm Password",
                placeholder: "Confirm New Password",
                required: true,
                errors,
                type: InputTypes.PASSWORD,
              },
            ]}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Reset Password
          </Button>
        </form>

        <div className="text-center text-sm">
          Remember your password?{" "}
          <div
            onClick={() => router.push(routes.signin())}
            className="cursor-pointer underline"
          >
            Login here
          </div>
        </div>
      </div>
    </div>
  );
}
