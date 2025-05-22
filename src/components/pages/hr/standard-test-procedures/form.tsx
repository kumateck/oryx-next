import { FormWizard } from "@/components/form-inputs";
import { InputTypes, Option } from "@/lib";
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
  materialsOptions: Option[];
}
export const StandardTestForm = <TFieldValues extends FieldValues, TContext>({
  register,
  errors,
  materialsOptions,
  control,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full space-y-6">
      <FormWizard
        config={[
          {
            label: "Selete Material",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "materialId",
            required: true,
            placeholder: "Selete Material",
            options: materialsOptions,
            errors,
          },
        ]}
      />
      <FormWizard
        config={[
          {
            label: "STP Number",
            register: register("stpNumber" as Path<TFieldValues>),
            type: InputTypes.TEXT,
            required: true,
            placeholder: "STP123557",
            errors,
          },
        ]}
      />
      <FormWizard
        config={[
          {
            label: "STP DescriptionS",
            register: register("description" as Path<TFieldValues>),
            type: InputTypes.TEXT,
            required: true,
            placeholder: "STP description",
            errors,
          },
        ]}
      />
    </div>
  );
};
