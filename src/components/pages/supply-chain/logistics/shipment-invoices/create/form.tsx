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
  suppliersOptions: Option[];
  poOptions: Option[];

  defaultValues?: TFieldValues;
}
const DocumentForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  defaultValues,
  suppliersOptions,
  poOptions,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full">
      <FormWizard
        className="grid w-full grid-cols-2 gap-x-10 space-y-0"
        fieldWrapperClassName="flex-grow"
        config={[
          {
            register: register("code" as Path<TFieldValues>),
            label: "Invoice Number",
            placeholder: "Enter Invoice Number",
            type: InputTypes.TEXT,
            errors,
          },
          {
            type: InputTypes.SPACE,
          },
          {
            label: "Vendor",
            control: control as Control,
            type: InputTypes.SELECT,
            name: "vendorId",
            defaultValue: defaultValues?.vendorId,
            required: true,
            onModal: true,
            placeholder: "Select vendor",
            options: suppliersOptions,
            errors,
          },
          {
            label: "Purchase Order",
            control: control as Control,
            type: InputTypes.MULTI,
            name: "purchaseOrderIds",
            defaultValue: defaultValues?.purchaseOrderIds,
            required: true,
            placeholder: "Select PO",
            options: poOptions,
            errors,
          },
        ]}
      />
    </div>
  );
};

export default DocumentForm;
