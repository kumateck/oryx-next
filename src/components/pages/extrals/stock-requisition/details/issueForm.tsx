import { FormWizard } from "@/components/form-inputs";
import { InputTypes } from "@/lib";
import React from "react";
import {
  Control,
  FieldArrayWithId,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { IssueFormValues } from "./types";

interface Props<TFieldValues extends FieldValues, TContext> {
  register: UseFormRegister<TFieldValues>;
  fields: FieldArrayWithId<IssueFormValues>[];
  control?: Control<TFieldValues, TContext>;
  errors: FieldErrors<TFieldValues>;
}
const IssueForm = <TFieldValues extends FieldValues, TContext>({
  register,
  errors,
  fields,
}: Props<TFieldValues, TContext>) => {
  return (
    <div className="space-y-4">
      <FormWizard
        config={[
          {
            register: register("requisitionId" as Path<TFieldValues>),
            label: "Requisition ID",
            errors,
            required: true,
            readOnly: true,
            type: InputTypes.TEXT,
          },
          {
            register: register("requestedDate" as Path<TFieldValues>),
            label: "Requested Date",
            errors,
            required: true,
            readOnly: true,
            type: InputTypes.TEXT,
          },
          {
            register: register("expectedDeliveryDate" as Path<TFieldValues>),
            label: "Expected Delivery Date",
            errors,
            required: true,
            readOnly: true,
            type: InputTypes.TEXT,
          },
          {
            register: register("requestedDepartment" as Path<TFieldValues>),
            label: "Requested Department",
            errors,
            required: true,
            readOnly: true,
            type: InputTypes.TEXT,
          },
          {
            register: register("justification" as Path<TFieldValues>),
            label: "Justification",
            errors,
            required: true,
            readOnly: true,
            type: InputTypes.TEXTAREA,
          },
        ]}
      />
      <div className="space-y-4">
        {fields.map((field, index) => (
          <FormWizard
            key={field.id}
            config={[
              {
                register: register(
                  `items.${index}.itemName` as Path<TFieldValues>,
                ),
                label: "Item Name",
                errors,
                required: true,
                readOnly: true,
                type: InputTypes.TEXT,
              },
              {
                register: register(
                  `items.${index}.ItemCode` as Path<TFieldValues>,
                ),
                label: "Item Code",
                errors,
                required: true,
                readOnly: true,
                type: InputTypes.TEXT,
              },
              {
                register: register(
                  `items.${index}.requestedQuantity` as Path<TFieldValues>,
                ),
                label: "Requested Qty",
                errors,
                required: true,
                readOnly: true,
                type: InputTypes.NUMBER,
              },
              {
                register: register(
                  `items.${index}.issuedQuantity` as Path<TFieldValues>,
                  { valueAsNumber: true },
                ),
                label: "Justification",
                errors,
                required: true,
                readOnly: true,
                type: InputTypes.TEXTAREA,
              },
            ]}
          />
        ))}
      </div>
    </div>
  );
};

export default IssueForm;
