import { FormWizard } from "@/components/form-inputs";
import { InputTypes } from "@/lib";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface SampleFormProps<TFieldValues extends FieldValues> {
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
}
function SampleForm<TFieldValues extends FieldValues>({
  register,
  errors,
}: SampleFormProps<TFieldValues>) {
  return (
    <div className="w-full space-y-4">
      <FormWizard
        config={[
          {
            label: "Material Name",
            type: InputTypes.TEXT,
            register: register("materialName" as Path<TFieldValues>),
            required: true,
            placeholder: "Enter material name",
            errors,
          },
        ]}
      />
      <FormWizard
        config={[
          {
            label: "Quantity",
            type: InputTypes.NUMBER,
            register: register("quantity" as Path<TFieldValues>),
            required: true,
            placeholder: "Enter quantity",
            errors,
          },
        ]}
      />
      <FormWizard
        config={[
          {
            label: "AR Number",
            type: InputTypes.TEXT,
            register: register("arNumber" as Path<TFieldValues>),
            required: true,
            placeholder: "Enter AR number",
            errors,
          },
        ]}
      />
      <FormWizard
        className="p-3"
        config={[
          {
            label: "Sample Quantity",
            type: InputTypes.NUMBER,
            register: register("sampleQuantity" as Path<TFieldValues>),
            required: true,
            placeholder: "20KG",
            errors,
          },
        ]}
      />
    </div>
  );
}

export default SampleForm;
