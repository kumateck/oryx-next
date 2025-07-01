import { FormWizard } from "@/components/form-inputs";
import { AlertType, InputTypes, NotificationType, Option } from "@/lib";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { NotificationFrequency, NotificationTypeLabels } from "./types";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  roleOptions: Option[];
  userOptions?: Option[];
}
const AlertForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  roleOptions,
  userOptions = [],
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="flex w-full flex-col gap-4">
      <FormWizard
        config={[
          {
            register: register("title" as Path<TFieldValues>),
            label: "Alert Title",
            placeholder: "Enter alert title",
            type: InputTypes.TEXT,
            required: true,
            errors,
          },
        ]}
      />
      <FormWizard
        config={[
          {
            control: control as Control,
            label: "Alert Item",
            name: "alertType",
            placeholder: "Enter alert item",
            type: InputTypes.SELECT,
            required: true,
            options: Object.entries(NotificationType)
              .filter(([, value]) => typeof value === "number")
              .map(([key, value]) => ({
                label: NotificationTypeLabels[value],
                value: NotificationType[key],
              })),
            errors,
          },
        ]}
      />
      <div className="flex w-full flex-col md:flex-row items-center gap-2">
        <FormWizard
          className="w-full"
          config={[
            {
              label: "Recipients",
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
              label: "Personnel",
              control: control as Control,
              type: InputTypes.MULTI,
              name: "userIds",
              required: true,
              placeholder: "Select personnel",
              options: userOptions,
              errors,
            },
          ]}
        />
      </div>
      <FormWizard
        config={[
          {
            control: control as Control,
            label: "Frequency",
            name: "Immediate",
            placeholder: "Select frequency",
            type: InputTypes.SELECT,
            required: true,
            options: Object.entries(NotificationFrequency)
              .filter(([, value]) => typeof value === "number")
              .map(([key, value]) => ({
                label: key,
                value: value.toString(),
              })),
            errors,
          },
        ]}
      />
      <FormWizard
        config={[
          {
            control: control as Control,
            label: "Due Date",
            name: "timeFrame",
            placeholder: "Enter due date",
            type: InputTypes.TIME,
            required: true,
            errors,
          },
        ]}
      />
      <FormWizard
        config={[
          {
            label: "Alert Notification Channel",
            control: control as Control,
            type: InputTypes.SELECT,
            placeholder: "Select channel",
            name: "type",
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
