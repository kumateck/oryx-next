import { useForm } from "react-hook-form";
import {
  ChangePasswordDto,
  ChangePasswordFormSchema,
  ChangePasswordValidator,
} from "./types";
import { FormWizard } from "@/components/form-inputs";
import { AuditModules, InputTypes } from "@/lib";
import { Button, Icon } from "@/components/ui";
import { toast } from "sonner";
import ThrowErrorMessage from "@/lib/throw-error";
import { usePostApiV1AuthChangePasswordMutation } from "@/lib/redux/api/openapi.generated";

export const ChangePasswordForm = () => {
  const [changePassword, { isLoading }] =
    usePostApiV1AuthChangePasswordMutation();
  const {
    handleSubmit,
    register,
    formState: { errors, isDirty },
    reset,
  } = useForm<ChangePasswordDto>({
    resolver: ChangePasswordValidator,
  });
  const onSubmit = async (data: ChangePasswordDto) => {
    const parsed = ChangePasswordFormSchema.safeParse(data);
    if (!parsed.success) {
      return toast.error(parsed.error.message);
    }
    try {
      await changePassword({
        module: AuditModules.authentication.name,
        subModule: AuditModules.authentication.changePassword,
        changePasswordRequest: {
          // currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        },
      }).unwrap();
      toast.success("Password changed successfully");
      reset();
    } catch (error: unknown) {
      ThrowErrorMessage(error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full mt-10 max-w-md">
      <FormWizard
        className="space-y-2 grid w-full gap-x-4"
        config={[
          {
            register: register("currentPassword"),
            label: "Current Password",
            type: InputTypes.PASSWORD,
            required: true,
            errors: errors,
          },
          {
            register: register("newPassword"),
            label: "New Password",
            type: InputTypes.PASSWORD,
            required: true,
            errors: errors,
          },
          {
            register: register("confirmNewPassword"),
            label: "Confirm New Password",
            type: InputTypes.PASSWORD,
            required: true,
            errors: errors,
          },
        ]}
      />
      <div className="flex justify-end mt-4">
        <Button disabled={isLoading || !isDirty} type="submit">
          {isLoading && (
            <Icon name="LoaderCircle" className="h-5 w-5 animate-spin" />
          )}
          Save
        </Button>
      </div>
    </form>
  );
};
