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
  inventoryItemsOptions: Option[];
}
const PurchaseRequisitionForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  errors,
  inventoryItemsOptions,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="w-full space-y-4">
      <div className="flex gap-2 w-full items-center justify-center">
        <FormWizard
          fieldWrapperClassName="flex-grow"
          config={[
            {
              register: register("name" as Path<TFieldValues>),
              label: "Name",
              placeholder: "Enter name",
              type: InputTypes.TEXT,
              required: true,
              errors,
            },
          ]}
        />
        <FormWizard
          fieldWrapperClassName="flex-grow"
          config={[
            {
              register: register("code" as Path<TFieldValues>),
              label: "Code",
              placeholder: "VED-001",
              type: InputTypes.TEXT,
              required: true,
              errors,
            },
          ]}
        />
      </div>
      <FormWizard
        fieldWrapperClassName="flex-grow"
        config={[
          {
            register: register("email" as Path<TFieldValues>),
            label: "Email",
            placeholder: "Enter email",
            type: InputTypes.EMAIL,
            required: true,
            errors,
          },

          {
            register: register("address" as Path<TFieldValues>),
            label: "Address",
            placeholder: "Enter address",
            type: InputTypes.TEXT,
            errors,
          },
        ]}
      />
      <div className="flex gap-2 w-full items-center justify-center">
        <FormWizard
          config={[
            {
              label: "Country",
              className: "w-full",
              control: control as Control,
              type: InputTypes.SELECT,
              name: "country",
              required: true,
              onModal: true,
              placeholder: "Select country",
              options: inventoryItemsOptions,
              errors,
            },
          ]}
        />
      </div>

      <div className="flex w-full items-center gap-2 justify-center">
        <FormWizard
          fieldWrapperClassName="flex-grow"
          className="w-full"
          config={[
            {
              register: register("contactPerson" as Path<TFieldValues>),
              label: "Contact Person",
              placeholder: "Enter contact person",
              type: InputTypes.TEXT,
              required: true,
              errors,
            },
          ]}
        />
        <FormWizard
          fieldWrapperClassName="flex-grow"
          className="w-full"
          config={[
            {
              register: register("contactNumber" as Path<TFieldValues>),
              label: "Contact Number",
              placeholder: "Enter telephone",
              type: InputTypes.TEXT,
              required: true,
              errors,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default PurchaseRequisitionForm;
