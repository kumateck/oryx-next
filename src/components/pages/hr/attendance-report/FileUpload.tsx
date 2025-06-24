import { FormWizard } from "@/components/form-inputs";
import { Control, FieldErrors, FieldValues } from "react-hook-form";
import { InputTypes } from "@/lib";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  errors: FieldErrors<TFieldValues>;
}

export const FileUpload = <TFieldValues extends FieldValues, TContext>({
  control,
  errors,
}: Props<TFieldValues, TContext>) => {
  return (
    <FormWizard
      className="w-full"
      config={[
        {
          type: InputTypes.DRAGNDROP,
          label: "",
          name: `file`,
          defaultValue: null,
          control: control as Control,
          errors,
        },
      ]}
    />
  );
};
