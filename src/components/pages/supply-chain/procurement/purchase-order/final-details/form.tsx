import React from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
// import { FetchOptionsResult } from "@/components/ui/paginated-select";
import { InputTypes, Option } from "@/lib";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  deliveryMode: Option[];
  termsOfPayment: Option[];
  defaultValues?: TFieldValues;
  currency: string;
}
const Form = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  termsOfPayment,
  deliveryMode,
  currency,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full">
      <FormWizard
        className="w-full gap-6 space-y-3"
        fieldWrapperClassName="flex-grow"
        config={[
          {
            register: register("invoiceNumber" as Path<TFieldValues>),
            label: "Pro-forma Invoice Number",
            placeholder: "Enter Invoice Number",
            type: InputTypes.TEXT,
            required: true,
            errors,
          },
          {
            register: register("totalFobValue" as Path<TFieldValues>, {
              valueAsNumber: true,
            }),
            label: `Total FOB Value (${currency})`,
            placeholder: "Enter total FOB Value",
            readOnly: true,
            type: InputTypes.NUMBER,
            required: true,
            errors,
          },
          {
            register: register("insuranceAmount" as Path<TFieldValues>, {
              valueAsNumber: true,
            }),
            label: `Insurance (${currency})`,
            placeholder: "Enter Insurance Amount",
            type: InputTypes.NUMBER,
            // required: true,
            errors,
          },
          {
            register: register("freight" as Path<TFieldValues>, {
              valueAsNumber: true,
            }),
            label: "Freight",
            placeholder: "Enter Freight Amount",
            type: InputTypes.NUMBER,
            // required: true,
            errors,
          },
          {
            register: register("cifValue" as Path<TFieldValues>, {
              valueAsNumber: true,
            }),
            label: `Total CIF Value (${currency})`,
            placeholder: "Enter total CIF value",
            type: InputTypes.NUMBER,
            required: true,
            readOnly: true,
            errors,
          },
          {
            register: register("amountInWords" as Path<TFieldValues>),
            label: "Amount in Word",
            placeholder: "Enter amount in word",
            type: InputTypes.TEXT,
            required: true,
            readOnly: true,
            errors,
          },
          {
            label: "Terms of Payment",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "termsOfPayment",
            required: true,
            placeholder: "Select Term of Payment",
            options: termsOfPayment,
            errors,
          },
          {
            label: "Delivery Mode",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "deliveryMode",
            required: true,
            placeholder: "Select Delivery Mode",
            options: deliveryMode,
            errors,
          },
          {
            label: "Estimated Delivery",
            control: control as Control,
            type: InputTypes.DATE,
            name: "estimatedDeliveryDate",
            disabled: { before: new Date() },
            required: true,
            placeholder: "Select Estimated Delivery Date",
            errors,
          },
        ]}
      />
    </div>
  );
};

export default Form;
