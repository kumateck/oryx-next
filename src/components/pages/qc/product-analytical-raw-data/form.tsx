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
  formOptions: Option[];
  stageOptions: Option[];
  stpOptions: Option[];
}

export const MaterialArdForm = <TFieldValues extends FieldValues, TContext>({
  register,
  errors,
  formOptions,
  control,
  stpOptions,
  stageOptions,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full space-y-3">
      <FormWizard
        className="py-3"
        config={[
          {
            label: "Stp Number",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "stpId",
            required: true,
            placeholder: "Select stp number",
            options: stpOptions,
            errors,
          },
        ]}
      />
      <FormWizard
        config={[
          {
            label: "Spec Number",
            register: register("specNumber" as Path<TFieldValues>),
            type: InputTypes.TEXT,
            required: true,
            placeholder: "NMP/B/SPC/001",
            errors,
          },
        ]}
      />
      <FormWizard
        config={[
          {
            label: "Stage",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "stage",
            placeholder: "Select Stage",
            required: true,
            options: stageOptions,
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
      <FormWizard
        className="w-full space-y-5 my-5"
        config={[
          {
            label: "Template",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "formId",
            required: true,
            placeholder: "Select Template",
            options: formOptions,
            errors,
          },
        ]}
      />
    </div>
  );
};
