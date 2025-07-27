import { FormWizard } from "@/components/form-inputs";
import { Card, CardContent, CardHeader } from "@/components/ui";
import { InputTypes, Option } from "@/lib";
import React from "react";
import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { TestStageValues } from "../types";

interface Props<TFieldValues extends FieldValues, TContext> {
  control: Control<TFieldValues, TContext>;
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;

  productOptions: Option[];
}
const SpecificationForm = <TFieldValues extends FieldValues, TContext>({
  control,
  register,
  productOptions,

  errors,
}: Props<TFieldValues, TContext>) => {
  return (
    <>
      <Card>
        <CardHeader className="font-semibold">Product Information</CardHeader>
        <CardContent className="w-full flex items-start justify-between gap-4 md:flex-row flex-col">
          <FormWizard
            className="w-full"
            config={[
              {
                label: "Product",
                type: InputTypes.SELECT,
                name: "productId",
                control: control as Control,
                placeholder: "Select Product",
                options: productOptions,
                errors,
              },
              {
                label: "SPC Number",
                type: InputTypes.TEXT,
                placeholder: "SPC Number",
                register: register("specificationNumber" as Path<TFieldValues>),
                required: true,
                errors,
              },
              {
                label: "Effective Date",
                type: InputTypes.DATE,
                placeholder: "Effective Date",
                name: "effectiveDate",
                control: control as Control,
                errors,
              },
              {
                label: "Packing Style",
                type: InputTypes.TEXT,
                placeholder: "Packing Style",
                readOnly: true,
                register: register("packingStyle" as Path<TFieldValues>),
                required: true,
                errors,
              },
              {
                label: "Label Claim",
                type: InputTypes.TEXTAREA,
                readOnly: true,
                required: false,
                placeholder: "Label Claim",
                register: register(`labelClaim` as Path<TFieldValues>),
                errors,
              },
            ]}
          />
          <FormWizard
            className="w-full"
            config={[
              {
                label: "Revision Date",
                type: InputTypes.DATE,
                name: "reviewDate",
                placeholder: "Revision Date",
                control: control as Control,
                errors,
              },
              {
                label: "Revision",
                type: InputTypes.TEXT,
                placeholder: "Revision",
                register: register("revisionNumber" as Path<TFieldValues>),
                errors,
              },
              {
                label: "Supersedes",
                type: InputTypes.TEXT,
                placeholder: "Supersedes",
                register: register("supersedesNumber" as Path<TFieldValues>),
                errors,
              },
              {
                label: "Test Stage",
                type: InputTypes.SELECT,
                name: `testStage`,
                control: control as unknown as Control,
                // TODO: update to show the right test stage options
                placeholder: "Select Test Stage",
                options: Object.keys(TestStageValues) // get only labels
                  .map((label) => ({
                    label: String(label),
                    value: String(TestStageValues[label]),
                  })),
                errors,
              },
              {
                label: "Shelf Life",
                type: InputTypes.TEXT,
                placeholder: "Shelf Life",
                readOnly: true,
                register: register("shelfLife" as Path<TFieldValues>),
                required: true,
                errors,
              },
            ]}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default SpecificationForm;
