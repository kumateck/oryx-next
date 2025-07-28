import React from "react";
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
  loading?: boolean;
}
const PurchaseForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  loading,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full">
      <FormWizard
        className="grid w-full grid-cols-2 gap-x-10 gap-y-5 space-y-0"
        fieldWrapperClassName="flex-grow"
        config={[
          {
            register: register("code" as Path<TFieldValues>),
            label: "Purchase Requisition Code",
            readOnly: true,
            required: true,
            suffix: loading ? "LoaderCircle" : "Check",
            suffixClass: loading ? "animate-spin" : "text-green-500",
            description: (
              <span className="text-sm text-neutral-500">
                You can’t change the PR code
              </span>
            ),
            placeholder: "Code will be generated",
            type: InputTypes.TEXT,
            errors,
          },
          {
            label: "Expected Delivery Date",
            control: control as Control,
            type: InputTypes.DATE,
            name: "expectedDelivery",
            disabled: {
              before: new Date(),
              after: new Date(2027, 0, 1),
            },
            errors,
          },
        ]}
      />
      <FormWizard
        config={[
          {
            label: "Remarks",
            control: control as Control,
            type: InputTypes.RICHTEXT,
            name: "comments",
            autoFocus: false,
            placeholder: "Enter remarks for schedule",
            suggestions: [],
            errors,
          },
        ]}
      />
    </div>
  );
};

export default PurchaseForm;
