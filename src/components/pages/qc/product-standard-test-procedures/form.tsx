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
  productsOptions: Option[];
}
export const StandardTestForm = <TFieldValues extends FieldValues, TContext>({
  register,
  errors,
  productsOptions,
  control,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full space-y-6">
      <FormWizard
        className="py-3"
        config={[
          {
            label: "Select Product",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "productId",
            required: true,
            placeholder: "Select Product",
            options: productsOptions,
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
        className="w-full space-y-5 my-5"
        config={[
          {
            type: InputTypes.DRAGNDROP,
            label: "Attach Documents",
            name: `attachments`,
            defaultValue: null,
            single: true,
            control: control as Control,
            errors,
          },
        ]}
      />
    </div>
  );
};
