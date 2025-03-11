"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { FormWizard } from "@/components/form-inputs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { InputTypes, routes } from "@/lib";
import {
  PostApiV1AuthForgotPasswordApiArg,
  usePostApiV1AuthForgotPasswordMutation,
} from "@/lib/redux/api/openapi.generated";
import { ErrorResponse, isErrorResponse } from "@/lib/utils";

import { ForgotPasswordSchema, TForgotPassword } from "./types";

function ForgotPassword() {
  const [forgotPassword, { isLoading }] =
    usePostApiV1AuthForgotPasswordMutation();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TForgotPassword>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmit = async (data: TForgotPassword) => {
    try {
      const payload = {
        forgotPasswordRequest: {
          email: data.email,
        },
      } satisfies PostApiV1AuthForgotPasswordApiArg;

      await forgotPassword(payload);

      toast.success("Password reset link sent successfully", {
        duration: 2000,
        onAutoClose: () => {
          router.push(routes.signin());
        },
      });
    } catch (error) {
      toast.error(
        isErrorResponse(error as ErrorResponse)?.description ||
          "An error occurred",
      );
    }
  };

  return (
    <form className="w-full px-12" onSubmit={handleSubmit(onSubmit)}>
      <Card className="border-0 shadow-none">
        <CardHeader>
          <CardTitle className="text-left text-2xl text-black">
            Forgot your password?
          </CardTitle>
          <CardDescription className="text-left">
            Enter your email to receive an email to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <FormWizard
              config={[
                {
                  autoFocus: true,
                  register: register("email"),
                  label: "Email",
                  required: true,
                  placeholder: "Enter Email",
                  errors,
                  type: InputTypes.EMAIL,
                  suffix: "Mail",
                },
              ]}
            />
            <Button
              type="submit"
              variant="default"
              className="flex w-full items-center justify-center gap-2"
            >
              {isLoading && (
                <Icon name="LoaderCircle" className="h-4 w-4 animate-spin" />
              )}
              <span>Send Email</span>
            </Button>
          </div>
          <div className="mt-6 text-center text-sm" />
        </CardContent>
      </Card>
    </form>
  );
}

export default ForgotPassword;
