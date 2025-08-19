import { FormWizard } from "@/components/form-inputs";
import { InputTypes } from "@/lib";
import {
  Control,
  Path,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

interface Props<TFieldValues extends FieldValues, TContext> {
  register: UseFormRegister<TFieldValues>;
  control: Control<TFieldValues, TContext>;
  errors: FieldErrors<TFieldValues>;
}

export const MemoArdForm = <TFieldValues extends FieldValues, TContext>({
  register,
  errors,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full space-y-6">
      <FormWizard
        config={[
          {
            label: "Spec Number",
            register: register("specNumber" as Path<TFieldValues>),
            type: InputTypes.TEXT,
            required: true,
            placeholder: "Enter Spec Number",
            errors,
          },
        ]}
      />
      <FormWizard
        config={[
          {
            label: "Description",
            register: register("description" as Path<TFieldValues>),
            type: InputTypes.TEXTAREA,
            required: false,
            placeholder: "Description",
            errors,
          },
        ]}
      />
    </div>
  );
};
