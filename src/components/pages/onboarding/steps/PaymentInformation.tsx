import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
import { InputTypes } from "@/lib";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
}

const PaymentInformationStep = <TFieldValues extends FieldValues, TContext>({
  register,
  errors,
}: Props<TFieldValues, TContext>) => {
  return (
    <>
      <FormWizard
        className="grid w-full grid-cols-3 gap-x-10 gap-y-5 space-y-0"
        config={[
          {
            register: register("accountNumber" as Path<TFieldValues>),
            label: "Bank Account Number",
            placeholder: "Enter your bank account number",
            type: InputTypes.TEXT,
            required: true,
            errors,
          },
          {
            register: register("ssnitNumber" as Path<TFieldValues>),
            label: "SSNIT Number",
            required: true,
            placeholder: "Enter your SSNIT number",
            type: InputTypes.TEXT,
            errors,
          },
          {
            register: register("ghanaCardNumber" as Path<TFieldValues>),
            label: "Ghana Card Number",
            required: true,
            placeholder: "Enter your Ghana Card number",
            type: InputTypes.TEXT,
            errors,
          },
        ]}
      />
    </>
  );
};

export default PaymentInformationStep;
