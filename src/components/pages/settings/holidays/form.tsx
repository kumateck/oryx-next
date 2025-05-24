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
export const HolidayForm = <TFieldValues extends FieldValues, TContext>({
  register,
  errors,
  control,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full space-y-6 mt-3">
      <FormWizard
        config={[
          {
            register: register("name" as Path<TFieldValues>),
            label: "Holiday Name",
            placeholder: "Ide-UI-Fitr",
            type: InputTypes.TEXT,
            errors,
            required: true,
          },
        ]}
      />
      <FormWizard
        config={[
          {
            control: control as Control,
            label: "Date",
            placeholder: "",
            name: "date",
            type: InputTypes.DATE,
            errors,
            required: true,
          },
        ]}
      />
      <FormWizard
        config={[
          {
            register: register("description" as Path<TFieldValues>),
            label: "Discription",
            placeholder: "Ide-UI-Fitr",
            type: InputTypes.TEXT,
            errors,
            required: false,
          },
        ]}
      />
    </div>
  );
};
