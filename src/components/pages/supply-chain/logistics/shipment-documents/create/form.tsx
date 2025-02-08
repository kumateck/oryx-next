import React from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import { FormWizard } from "@/components/form-inputs";
import { InputTypes, Option } from "@/lib";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  purchaseOrderOptions: Option[];

  defaultValues?: TFieldValues;
}
const DocumentForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  purchaseOrderOptions,
  defaultValues,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full">
      <FormWizard
        className="grid w-full grid-cols-2 gap-x-10 space-y-0"
        fieldWrapperClassName="flex-grow"
        config={[
          {
            register: register("code" as Path<TFieldValues>),
            label: "Document Code",
            placeholder: "Code will be generated",
            type: InputTypes.TEXT,
            readOnly: true,
            required: true,
            description: (
              <span className="text-neutral-seondary text-sm">
                You can’t change the document code
              </span>
            ),
            errors,
          },
          {
            label: "Vendor",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "purchaseOrderId",
            defaultValue: defaultValues?.purchaseOrderId,
            required: true,
            onModal: true,
            placeholder: "Select vendor",
            options: purchaseOrderOptions,
            errors,
          },

          {
            register: register("invoiceNumber" as Path<TFieldValues>),
            label: "Invoice Number",
            placeholder: "Enter Invoice Number",
            type: InputTypes.TEXT,
            errors,
          },
        ]}
      />
      <div>
        <FormWizard
          config={[
            {
              type: InputTypes.DRAGNDROP,
              label: "Attach Documents",
              name: `attachments`,
              defaultValue: null,
              control: control as Control,
              errors,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default DocumentForm;
