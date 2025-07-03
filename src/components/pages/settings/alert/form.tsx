import { FormWizard } from "@/components/form-inputs";
import { AlertType, InputTypes, NotificationType, Option } from "@/lib";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { NotificationTypeLabels } from "./types";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  roleOptions: Option[];
  usersOptions?: Option[];
}
const AlertForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  roleOptions,
  usersOptions,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="flex w-full flex-col gap-4">
      <FormWizard
        config={[
          {
            label: "Alert Title",
            placeholder: "Enter alert title",
            type: InputTypes.TEXT,
            register: register("title" as Path<TFieldValues>),
            required: true,
            errors,
          },
        ]}
      />
      <FormWizard
        config={[
          {
            control: control as Control,
            label: "Notification Type",
            name: "notificationType",
            placeholder: "Select a notification type",
            type: InputTypes.SELECT,
            required: true,
            options: Object.entries(NotificationType)
              .filter(([, value]) => typeof value === "number")
              .map(([key]) => {
                return {
                  label: NotificationTypeLabels[NotificationType[key]], // "Raw" or "Package"
                  value: NotificationType[key], // 0 or 1
                };
              }),
            errors,
          },
        ]}
      />
      <div className="flex w-full flex-col md:flex-row items-center gap-2">
        <FormWizard
          className="w-full"
          config={[
            {
              label: "Role Recipients",
              control: control as Control,
              type: InputTypes.MULTI,
              placeholder: "Select roles",
              name: "roleIds",
              required: true,
              options: roleOptions,
              errors,
            },
          ]}
        />
        <FormWizard
          className="w-full"
          config={[
            {
              label: "User Recipients",
              control: control as Control,
              type: InputTypes.MULTI,
              name: "userIds",
              required: true,
              placeholder: "Select users",
              options: usersOptions || [],
              errors,
            },
          ]}
        />
      </div>

      <FormWizard
        config={[
          {
            control: control as Control,
            label: "Due Date",
            name: "timeFrame",
            placeholder: "Select due date",
            type: InputTypes.MOMENT,
            required: true,
            errors,
          },
        ]}
      />

      <FormWizard
        config={[
          {
            label: "Notification Channels",
            control: control as Control,
            type: InputTypes.MULTI,
            placeholder: "Select notification channels",
            name: "alertType",
            required: true,
            options: Object.entries(AlertType)
              .filter(([, value]) => typeof value === "number")
              .map(([key, value]) => ({
                label: key,
                value: value.toString(),
              })),
            errors,
          },
        ]}
      />
    </div>
  );
};

export default AlertForm;
