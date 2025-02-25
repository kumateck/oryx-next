import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { FormWizard } from "@/components/form-inputs";
import { Button } from "@/components/ui/button";
import { InputTypes } from "@/lib";
import { usePostApiV1AuthChangePasswordMutation } from "@/lib/redux/api/openapi.generated";
import { ErrorResponse, isErrorResponse } from "@/lib/utils";

import {
  ChangePasswordDto,
  ChangePasswordInp,
  ChangePasswordSchema,
} from "./types";

export function ChangePasswordForm({ onSuccess }: { onSuccess: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordDto>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  const [changePassword, { isLoading }] =
    usePostApiV1AuthChangePasswordMutation();

  const onSubmit = async (values: ChangePasswordDto) => {
    try {
      await changePassword({
        changePasswordRequest: {
          newPassword: values.newPassword,
        },
      }).unwrap();

      toast.success("Password changed successfully");
      reset();
      onSuccess();
    } catch (error) {
      toast.error(
        isErrorResponse(error as ErrorResponse)?.description ||
          "An error occurred",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormWizard
        config={[
          {
            autoFocus: true,
            register: register(ChangePasswordInp.newPassword),
            label: "New Password",
            required: true,
            placeholder: "Enter Your New Password",
            errors,
            type: InputTypes.PASSWORD,
            suffix: "Mail",
          },
          {
            register: register(ChangePasswordInp.confirmPassword),
            label: "Password",
            placeholder: "Confirm Your New Password",
            required: true,
            errors,
            type: InputTypes.PASSWORD,
          },
        ]}
      />
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Change Password
      </Button>
    </form>
  );
}
