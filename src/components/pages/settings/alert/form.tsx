import { FormWizard } from "@/components/form-inputs";
import { InputTypes } from "@/lib";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { modelTypes } from "./types";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
}
const AlertForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
}: Props<TFieldValues, TContext>) => {
  return (
    <div>
      <FormWizard
        config={[
          {
            register: register("code" as Path<TFieldValues>),
            label: "Department Code",
            placeholder: "Enter name",
            type: InputTypes.TEXT,

            readOnly: true,
            required: true,
            description: (
              <span className="text-sm text-neutral-500">
                You can’t change the department code
              </span>
            ),

            errors,
          },
          {
            register: register("name" as Path<TFieldValues>),
            label: "Name",
            placeholder: "Enter name",
            type: InputTypes.TEXT,

            required: true,

            errors,
          },
          {
            label: "Type",
            control: control as Control,
            type: InputTypes.RADIO,
            name: "type",
            required: true,
            options: Object.entries(modelTypes)
              .filter(([, value]) => typeof value === "number")
              .map(([key, value]) => ({
                label: key, // "Raw" or "Package"
                value: value.toString(), // 0 or 1
              })),
            errors,
          },
        ]}
      />
    </div>
  );
};

export default AlertForm;
