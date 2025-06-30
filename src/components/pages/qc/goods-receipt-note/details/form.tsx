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
  baseUnit: string;
}
function SampleForm<TFieldValues extends FieldValues>({
  register,
  errors,
  baseUnit,
}: SampleFormProps<TFieldValues>) {
  return (
    <div className="space-y-4">
      <FormWizard
        config={[
          {
            label: "Material Name",
            readOnly: true,
            type: InputTypes.TEXT,
            register: register("materialName" as Path<TFieldValues>),
            errors,
          },
        ]}
      />
      <FormWizard
        config={[
          {
            label: "Batch Number",
            type: InputTypes.TEXT,
            readOnly: true,
            register: register("batchNumber" as Path<TFieldValues>),
            errors,
          },
        ]}
      />
      <FormWizard
        config={[
          {
            label: "Quantity",
            type: InputTypes.TEXT,
            register: register("quantity" as Path<TFieldValues>),
            readOnly: true,
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
            // readOnly: true,
            errors,
          },
        ]}
      />
      <FormWizard
        config={[
          {
            label: "Sample Quantity",
            type: InputTypes.NUMBER,
            register: register("sampleQuantity" as Path<TFieldValues>),
            required: true,
            placeholder: "Enter Sample Quantity",
            prefixText: baseUnit,
            errors,
          },
        ]}
      />
    </div>
  );
}

export default SampleForm;
